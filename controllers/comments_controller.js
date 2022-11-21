const Comment=require('../models/comment');
const Product=require('../models/product');
module.exports.createComment=function(req,res){
    Product.findById(req.params.id,function(err,product){
        if(product){
            Comment.create({
                content:req.body.content,
                star:req.body.star,
                user:req.user._id
            },function(err,comment){
                product.comments.push(comment);
                product.save();
                console.log(comment);
                res.redirect('back');
            });
        }
    });
}

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id){
            let proId=comment.product;
            comment.remove();
            Product.findByIdAndUpdate(proId,{$pull:{comments:req.params.id}},function(err,product){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}