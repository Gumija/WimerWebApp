"use strict";
var Comment = (function () {
    function Comment(id, title, content, top) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.top = top;
    }
    Comment.prototype.getTag = function () {
        return 'comment-' + this.id;
    };
    return Comment;
}());
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map