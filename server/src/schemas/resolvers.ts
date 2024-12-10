import  User from '../models/User.js';
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




const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('items');
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate('savedItems');
    },
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
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      console.log (input);
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
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
    // addItem: async (_parent: any, { input }: AddItemArgs, context: any) => {
    //   if (context.user) {
    //     const item = await Item.create({ ...input });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { thoughts: item._id } }
    //     );

    //     return item;
    //   }
    //   throw AuthenticationError;
    //   ('You need to be logged in!');
    // },
    // removeItem: async (_parent: any, { ItemId }: ItemArgs, context: any) => {
    //   if (context.user) {
    //     const item = await Item.findOneAndDelete({
    //       _id: ItemId,
    //       itemPrice: context.user.username,
    //     });

    //     if(!item){
    //       throw AuthenticationError;
    //     }

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { items: item._id } }
    //     );

    //     return item;
    //   }
    //   throw AuthenticationError;
    // },
  },
};

export default resolvers;
