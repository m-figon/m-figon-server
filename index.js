const express = require('express');
const app = express();
const cors = require('cors');

const typingData = require('./FastTyping/users');

const blog = require('./Blog/blog');
const blogUsers = require('./Blog/users');

const accounts = require('./GameStore/accounts');
const PS = require('./GameStore/PS');
const XBOX = require('./GameStore/XBOX');
const PC = require('./GameStore/PC');
const NINTENDO = require('./GameStore/NINTENDO');

const shopUsers = require('./ClothesShop/users');
const shopMan = require('./ClothesShop/man');
const shopWoman = require('./ClothesShop/woman');

const chatAccounts = require('./Chat/accounts');
const chatChannels = require('./Chat/channels');
const ElMusico = require('./Chat/ElMusico');
const Fitnez = require('./Chat/Fitnez');
const FootballMadness = require('./Chat/FootballMadness');
const GamingArmy = require('./Chat/GamingArmy');
const WeLoveCooking = require('./Chat/WeLoveCooking');
const WhyNotGardening = require('./Chat/WhyNotGardening');

const FitnessMeals = require('./Fitness/Meals.json');
const SlickJoeCardioExercise = require('./Fitness/SlickJoeCardioExercise.json');
const SlickJoeMeals = require('./Fitness/SlickJoeMeals.json');
const SlickJoeStrengthExercise = require('./Fitness/SlickJoeStrengthExercise.json');
const SlickJoeWeight = require('./Fitness/SlickJoeWeight.json');
const FitnessUsers = require('./Fitness/users.json');

const forumPosts = require('./Forum/posts.json');
const forumUsers = require('./Forum/users.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res, next) => {
    res.sendFile(__dirname +"/home.html");
});
app.get('/:type', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(`<h2>Welcome to ${req.params.type}</h2>`));
});
app.get('/ClothesShop/man', (req, resp) => {
    resp.json(shopMan);
});
app.get('/ClothesShop/woman', (req, resp) => {
    resp.json(shopWoman);
});
app.get('/ClothesShop/users', (req, resp) => {
    resp.json(shopUsers);
});
app.post('/ClothesShop/users', (req, resp) => {
    const content = {
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
        cart: [],
        orders: [],
        id: shopUsers.length
    };
    shopUsers.push(content);
    resp.json(shopUsers);
});
app.put('/ClothesShop/users/:id', (req, resp) => {
    const content = {
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
        cart: req.body.cart,
        orders: req.body.orders,
        id: req.body.id
    };
    shopUsers[req.params.id] = content;
    resp.json(shopUsers);
});
app.get('/Blog/posts', (req, resp) => {
    resp.json(blog);
});
app.post('/Blog/posts', (req, resp) => {
    const content = {
        title: req.body.title,
        content: req.body.content,
        img: req.body.img,
        date: req.body.date,
        author: req.body.author,
        comments: [],
        id: blog.length
    };
    blog.push(content);
    resp.json(blog);
});
app.put('/Blog/posts/:id', (req, resp) => {
    const content = {
        title: req.body.title,
        content: req.body.content,
        img: req.body.img,
        date: req.body.date,
        author: req.body.author,
        comments: req.body.comments,
        id: req.body.id
    };
    blog[req.params.id] = content;
    resp.json(blog);
});
app.get('/Blog/users', (req, resp) => {
    resp.json(blogUsers);
});
app.post('/Blog/users', (req, resp) => {
    const content = {
        email: req.body.email,
        account: req.body.account,
        password: req.body.password,
        id: blogUsers.length
    };
    blogUsers.push(content);
    resp.json(blogUsers);
});
app.get('/Fitness/Meals', (req, resp) => {
    resp.json(FitnessMeals);
});
app.get('/Fitness/users', (req, resp) => {
    resp.json(FitnessUsers);
});
app.post('/Fitness/users', (req, resp) => {
    const user = {
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password,
        calories: req.body.calories,
        carbs: req.body.carbs,
        fats: req.body.fats,
        protein: req.body.protein,
        id: FitnessUsers.length
    };
    FitnessUsers.push(user);
    resp.json(FitnessUsers);
});

app.put('/Fitness/users/:id', (req, resp) => {
    const user = {
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password,
        calories: req.body.calories,
        carbs: req.body.carbs,
        fats: req.body.fats,
        protein: req.body.protein,
        id: req.params.id
    };
    FitnessUsers[req.params.id] = user;
    resp.json(FitnessUsers);
});

app.get('/Fitness/SlickJoeCardioExercise', (req, resp) => {
    resp.json(SlickJoeCardioExercise);
});
app.post('/Fitness/SlickJoeCardioExercise', (req, resp) => {
    const Exercise = {
        name: req.body.name,
        minutes: req.body.minutes,
        calories: req.body.calories,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        id: SlickJoeCardioExercise.length
    };
    SlickJoeCardioExercise.push(Exercise);
    resp.json(SlickJoeCardioExercise);
});
app.delete('/Fitness/SlickJoeCardioExercise/:id', (req, resp) => {
    SlickJoeCardioExercise.splice(req.params.id, 1);
    resp.json(SlickJoeCardioExercise);
});
app.get('/Fitness/SlickJoeMeals', (req, resp) => {
    resp.json(SlickJoeMeals);
});
app.delete('/Fitness/SlickJoeMeals/:id', (req, resp) => {
    SlickJoeMeals.splice(req.params.id, 1);
    resp.json(SlickJoeMeals);
});
app.post('/Fitness/SlickJoeMeals', (req, resp) => {
    const meal = {
        meal: req.body.meal,
        quantity: req.body.quantity,
        calories: req.body.calories,
        carbs: req.body.carbs,
        fats: req.body.fats,
        protein: req.body.protein,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day
    };
    SlickJoeMeals.push(meal);
    resp.json(SlickJoeMeals);
});
app.get('/Fitness/SlickJoeStrengthExercise', (req, resp) => {
    resp.json(SlickJoeStrengthExercise);
});
app.delete('/Fitness/SlickJoeStrengthExercise/:id', (req, resp) => {
    SlickJoeStrengthExercise.splice(req.params.id, 1);
    resp.json(SlickJoeStrengthExercise);
});
app.post('/Fitness/SlickJoeStrengthExercise', (req, resp) => {
    const Exercise = {
        name: req.body.name,
        reps: req.body.reps,
        sets: req.body.sets,
        weight: req.body.weight,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        id: SlickJoeStrengthExercise.length
    };
    SlickJoeStrengthExercise.push(Exercise);
    resp.json(SlickJoeStrengthExercise);
});
app.get('/Fitness/SlickJoeWeight', (req, resp) => {
    resp.json(SlickJoeWeight);
});
app.post('/Fitness/SlickJoeWeight', (req, resp) => {
    const weight = {
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        weight: req.body.weight,
        id: SlickJoeWeight.length
    };
    SlickJoeWeight.push(weight);
    resp.json(SlickJoeWeight);
});
app.put('/Fitness/SlickJoeWeight/:id', (req, resp) => {
    const weight = {
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        weight: req.body.weight,
        id: req.params.id
    };
    SlickJoeWeight[req.params.id] = weight;
    resp.json(SlickJoeWeight);
});

app.get('/Chat/accounts', (req, resp) => {
    resp.json(chatAccounts);
});
app.post('/Chat/accounts', (req, resp) => {
    const chatAccount = {
        email: req.body.email,
        account: req.body.account,
        password: req.body.password,
        img: req.body.img,
        id: chatAccounts.length
    };
    chatAccounts.push(chatAccount);
    resp.json(chatAccounts);
});

app.put('/Chat/accounts/:id', (req, resp) => {
    const chatAccount = {
        email: req.body.email,
        account: req.body.account,
        password: req.body.password,
        img: req.body.img,
        id: req.params.id
    };
    chatAccounts[req.params.id] = chatAccount;
    resp.json(chatAccounts);
});

app.get('/Chat/channels', (req, resp) => {
    resp.json(chatChannels);
});

app.get('/Chat/ElMusico', (req, resp) => {
    resp.json(ElMusico);
});

app.post('/Chat/ElMusico', (req, resp) => {
    const newPost = {
        author: req.body.author,
        date: req.body.date,
        content: req.body.content,
        id: ElMusico.length
    };
    ElMusico.push(newPost);
    resp.json(ElMusico);
});

app.get('/Chat/Fitnez', (req, resp) => {
    resp.json(Fitnez);
});

app.post('/Chat/Fitnez', (req, resp) => {
    const newPost = {
        author: req.body.author,
        date: req.body.date,
        content: req.body.content,
        id: Fitnez.length
    };
    Fitnez.push(newPost);
    resp.json(Fitnez);
});

app.get('/Chat/FootballMadness', (req, resp) => {
    resp.json(FootballMadness);
});

app.post('/Chat/FootballMadness', (req, resp) => {
    const newPost = {
        author: req.body.author,
        date: req.body.date,
        content: req.body.content,
        id: FootballMadness.length
    };
    FootballMadness.push(newPost);
    resp.json(FootballMadness);
});

app.get('/Chat/GamingArmy', (req, resp) => {
    resp.json(GamingArmy);
});

app.post('/Chat/GamingArmy', (req, resp) => {
    const newPost = {
        author: req.body.author,
        date: req.body.date,
        content: req.body.content,
        id: GamingArmy.length
    };
    GamingArmy.push(newPost);
    resp.json(GamingArmy);
});

app.get('/Chat/WeLoveCooking', (req, resp) => {
    resp.json(WeLoveCooking);
});

app.post('/Chat/WeLoveCooking', (req, resp) => {
    const newPost = {
        author: req.body.author,
        date: req.body.date,
        content: req.body.content,
        id: WeLoveCooking.length
    };
    WeLoveCooking.push(newPost);
    resp.json(WeLoveCooking);
});

app.get('/Chat/WhyNotGardening', (req, resp) => {
    resp.json(WhyNotGardening);
});

app.post('/Chat/WhyNotGardening', (req, resp) => {
    const newPost = {
        author: req.body.author,
        date: req.body.date,
        content: req.body.content,
        id: WhyNotGardening.length
    };
    WhyNotGardening.push(newPost);
    resp.json(WhyNotGardening);
});

app.get('/Forum/Posts', (req, resp) => {
    resp.json(forumPosts);
});
app.put('/Forum/Posts/:id', (req, resp) => {
    const content = {
        user: req.body.user,
        title: req.body.title,
        post: req.body.post,
        src: req.body.src,
        section: req.body.section,
        points: req.body.points,
        commentsQuantity: req.body.commentsQuantity,
        date: req.body.date,
        comments: req.body.comments,
        id: req.params.id
    };
    forumPosts[req.params.id] = content;
    resp.json(forumPosts);
});
app.get('/Forum/Users', (req, resp) => {
    resp.json(forumUsers);
});
app.post('/Forum/Users', (req, resp) => {
    const content = {
        user: req.body.user,
        password: req.body.password,
        id: forumUsers.length
    };
    forumUsers.push(content);
    resp.json(forumUsers);
});
app.get('/GameStore/Accounts', (req, resp) => {
    resp.json(accounts);
});

app.post('/GameStore/Accounts', (req, resp) => {
    const account = {
        id: accounts.length,
        name: req.body.name,
        password: req.body.password
    };
    accounts.push(account);
    resp.json(accounts);
});

app.get('/GameStore/PS', (req, resp) => {
    resp.json(PS);
});
app.get('/GameStore/XBOX', (req, resp) => {
    resp.json(XBOX);
});
app.get('/GameStore/PC', (req, resp) => {
    resp.json(PC);
});
app.get('/GameStore/NINTENDO', (req, resp) => {
    resp.json(NINTENDO);
});

app.get('/FastTyping/data', (req, resp) => {
    resp.json(typingData);
});

app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));