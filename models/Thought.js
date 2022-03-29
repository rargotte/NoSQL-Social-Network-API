const { Schema, Types } = require('mongoose');
const reactionSchema = require('./Reaction');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtual: true
        },
        id: false,
    }
);

// Create a virtual called `reactionCount` that retrieves the length of the toughts `reactions` array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
// Initialize our Thoughts model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;


