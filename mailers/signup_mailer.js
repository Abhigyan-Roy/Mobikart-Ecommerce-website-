const nodeMailer=require('../config/nodemailer');
exports.newSign=(user)=>{
    let htmlString=nodeMailer.renderTemplate({user:user},'/SignUpmail.ejs');
    nodeMailer.transporter.sendMail({
        from:'abhigyan.roy.cse24@heritageit.edu.in',
        to: user.email,
        subject: 'New Account Created!',
        html: htmlString
    },(err, info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        return;
    });
}