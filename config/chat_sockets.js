function serverSide(io) {
  io.on('connection', function (socket) {
    console.log('connected with sockets', socket.id);

    let questions = {
      'hi': 'Hello! Welcome to MobiCart. How can I help you today?',
      'hello': 'Hi there! How can I assist you?',
      'hey': 'Hey! What would you like to know?',
      'how are you?': 'I am doing great. Thanks for asking!',
      'what is your name?': 'I am the MobiCart assistant bot.',
      'who are you?': 'I am your shopping assistant for MobiCart.',
      'what can you do?': 'I can help with products, cart, wishlist, checkout, and order questions.',
      'help': 'You can ask about phones, prices, brands, orders, payment, shipping, returns, and account issues.',
      'how to signup?': 'Go to Sign up from the top-right navbar and create your account.',
      'how to sign in?': 'Click Sign in on the navbar and enter your registered email and password.',
      'i forgot my password': 'Password reset is not fully automated yet. Please contact support from Contact Us page.',
      'how to update profile?': 'Open your profile and click Edit Profile to update your details.',
      'how to add products to cart?': 'Open a product and click Add to Cart. You can also add directly from listing pages.',
      'how to remove product from cart?': 'Go to Cart and click Remove on the product card.',
      'how to increase quantity?': 'In Cart, use the + button to increase quantity.',
      'how to decrease quantity?': 'In Cart, use the - button to decrease quantity.',
      'how to use wishlist?': 'Click Move to Wishlist on a product. You can move wishlist items to cart anytime.',
      'how to remove from wishlist?': 'Open Wishlist and click Remove for the product you want to delete.',
      'where is my wishlist?': 'If signed in, click Wishlist in the top-right navbar.',
      'how to compare phones?': 'Go to Compare from navbar, choose two products, then click Compare.',
      'what payment methods are available?': 'Card payment via Stripe is supported on checkout.',
      'is cod available?': 'COD is not enabled currently. Please use online payment.',
      'how to checkout?': 'Go to Cart and click Checkout, fill shipping details, then submit order.',
      'how to place order?': 'Add product to cart, open checkout, fill details, and submit.',
      'how to track my order?': 'Open My Orders from your account to see order status and details.',
      'where can i see my orders?': 'Go to My Orders page from your account section.',
      'how long is delivery?': 'Delivery time depends on location, usually 3-7 business days.',
      'do you provide free shipping?': 'Free shipping is available on many products shown in listing cards.',
      'what is return policy?': 'Please check Terms/Return policy section in footer for latest rules.',
      'can i cancel my order?': 'Contact support quickly after placing order; cancellation depends on order status.',
      'do you have discounts?': 'You can find discounted prices directly on product cards and deals section.',
      'best phone under 20000': 'Try comparing Redmi, Realme, and Samsung models under your budget.',
      'best phone under 30000': 'Check brand pages and compare camera, battery, and processor before buying.',
      'best camera phone': 'For camera, compare rear/front cam specs and user ratings on product detail pages.',
      'best gaming phone': 'For gaming, prioritize processor, RAM, and battery capacity.',
      'show samsung phones': 'Open Brands > samsung from the navbar.',
      'show oppo phones': 'Open Brands > oppo from the navbar.',
      'show vivo phones': 'Open Brands > vivo from the navbar.',
      'show realme phones': 'Open Brands > realme from the navbar.',
      'show iphone phones': 'Open Brands > iphone from the navbar.',
      'show oneplus phones': 'Open Brands > oneplus from the navbar.',
      'is my data safe?': 'Your account data is stored securely, but always use a strong password and keep it private.',
      'contact support': 'Go to Contact Us page and send your message.',
      'thank you': 'You are welcome! Happy shopping on MobiCart.',
      'thanks': 'Glad I could help!'
    };

    socket.on('user-queried', (msg) => {
      console.log('Message received:', msg);
      const userQuery = (msg.query || '').toString().trim().toLowerCase();
      let response = questions[userQuery] || 'I did not understand your question! Try asking: "how to checkout?" or "how to compare phones?"';
      socket.emit('server-replied', { reply: response })
    });
  });
}

module.exports = serverSide;
