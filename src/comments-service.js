const CommentService = {
    getAllComments(knex){
        return knex.select('*')
        .from('comments');
    },

    getByID(knex, id){
        return knex.select('*')
        .from('comments')
        .where('id', id)
        .first();
    },

    insertComment(knex, comment){
        return knex.insert(comment)
        .into('comments')
        .returning('*')
        .then(data => data[0])
    },

    deleteComment(knex, id){
        return knex('comments')
        .where('id', id)
        .delete()
    },

    updateComment(knex, id, comment){
        return knex('comments')
        .where('id', id)
        .update(comment)
    }
};

module.exports = CommentService;