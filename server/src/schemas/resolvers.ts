// import { saveItem } from '../controllers/user-controller.js';
import  User from '../models/User.js';
// import { Item } from '../models/Item.js';
import { signToken, AuthenticationError } from '../services/auth.js'; 

// Define types for the arguments
interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  username: string;
}

// interface ItemArgs {
//   ItemId: string;
// }



const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('items');
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate('savedItems');
    },
    // category: async (_parent: any, { username }: UserArgs) => {
    //   return User.findOne({ username }).populate('showItems');
    // },
    // items: async () => {
    //   return await Item.find().sort({ description: -1 });
    // },
    // item: async (_parent: any, { ItemId }: ItemArgs) => {
    //   return await Item.findOne({ _id: ItemId });
    // },
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedItems');
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
    savedItems: async (_parent: any, _args: any, context: any) => {
      console.log('Context user:', context.user);

      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        const user = await User.findById(context.user._id).select('savedItems');
        if (!user) {
          throw new Error('User not found');
        }

        console.log('Fetched saved items:', user.savedItems);
        return user.savedItems.map((item: any) => ({
          _id: item._id.toString(),
          title: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
          image: item.image,
        }));
      } catch (err) {
        console.error('Error fetching saved items:', err);
        throw new Error('Failed to fetch saved items');
      }
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      console.log (input);
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
      console.log (user);
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
      console.log (token);
      // Return the token and the user
      return { token, user };
    },
    
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    saveItem: async (_parent: any, { input }: { input: any }, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      console.log('Item input received:', input);

      const { title, price, description, category, image } = input;

      if (!title || !price || !description || !category || !image) {
        throw new Error('Missing required fields. Ensure title, price, description, and image are provided.');
      }

      const formattedInput = {
        title,
        price: price.toString(),
        description,
        category: category || 'Uncategorized',
        image,
      };

      try {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedItems: formattedInput } },
          { new: true, runValidators: true }
        );

        if (!updatedUser) {
          throw new Error('User not found');
        }

        console.log('Updated user saved items:', updatedUser?.savedItems);

        return formattedInput;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to save item');
      }
    },
    removeItem: async (
      _parent: any,
      { itemId }: { itemId: string },
      context: any
    ) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedItems: { ID: itemId } } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

export default resolvers;
