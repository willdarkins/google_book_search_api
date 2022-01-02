const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    //omit Mongoose-specific __v property and user's password
                    .select('-__v -password');
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            //conditional authentication to verify username/password combo are correct, or NOT duplicate
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            //signs token and returns object that combines the token with the user's data
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            //signs token and returns object that combines the token with the user's data
            return { token, user };
        },
        saveBook: async (parent, { bookData }, context) => {
            //check for the existence of context.user - as only logged-in users should be able to use this mutation
            if (context.user) {
            //books are stored as arrays under the User model - hence why we need to find, update and push the new saved book onto the array
              const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookParams } },
                { new: true }
              );
      
              return updatedUser;
            }
            //if user not logged in - authentication error
            throw new AuthenticationError('You need to be logged in!');
          },
    }
};

module.exports = resolvers;