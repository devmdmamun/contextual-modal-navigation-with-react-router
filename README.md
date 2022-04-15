![blog.png](./src/blog.png)

I'm currently (April 2022) creating a side-project using ReactJs. I have taken inspiration from various existing popular websites like Twitter, Facebook, Trello, etc. I was trying to create an edit-profile UI like Twitter. When you click the Edit Profile button, a pop-up window opens and the URL changes. But the previous page remains in the background. After closing the popup, it goes back to the previous page.

<p align="center">
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1649944317683/4rbTMUAoj.gif" />
</p>

I had no idea how to do it. I searched it on Google, but I found some old tutorials. Note: I am using React Router V6. Finally, I did it. Now, I will show you how I did it.

<p align="center">
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1649945258156/XQHc834qX.gif" />
</p>

## Let's Start

First thing first, create a react app and install react-router-dom.

```
npx create-react-app my-app
cd my-app
```

```
npm i react-router-dom
```

I have deleted all of the test files. You can keep them if you want. Create a "Components" folder. Here we will put our homepage and model. Create two files named `Modal.js` and `Main.js` inside the "Components" folder. `Main.js` is our homepage.

### Main.js

```
import { Link, useLocation } from "react-router-dom";

export const Main = () => {
  const location = useLocation();
  return (
    <div>
      <h2>Create contextual modal navigation</h2>
      <Link to="/modal" state={{ background: location }}>
        Open Modal
      </Link>
    </div>
  );
};

```

`Main.js` is a react-arrow-functional-component. We have two elements here `<h2/>` and `<Link />`. Note: The `<Link />` element contains an additional state attribute. It contains an object. We will pass background as key and location as value. We will use this object in the future.

### Modal.js

```
import { useNavigate } from "react-router-dom";

export const Modal = () => {
  const navigate = useNavigate();
  return (
    <div className="modalDiv">
      <div className="modal">
        <h3>Modal</h3>
        <button onClick={() => navigate(-1)}>Close</button>
      </div>
    </div>
  );
};

```

### App.css

```
.App {
  text-align: center;
}

.modalDiv {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  background-color: rgba(91, 112, 131, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  width: 350px;
  height: 200px;
  background-color: white;
  border-radius: 5px;
}

```

### Index.js

```
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);

```

We have wrapped `<App />` with `<Router />` inside the `Index.js` file instead of placing it on the `App.js` file. This is because we will use the useLocation hook used by the React Router in the App.js file. We're not allowed to place any hook used by the React router outside of `<Router />`.

### App.js

```
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Main } from "./components/Main";
import { Modal } from "./components/Modal";
function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className="App">
      <Routes location={background || location}>
        <Route path="/" element={<Main />}>
          <Route path="modal" element={<Modal />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="modal" element={<Modal />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

```

When we click on the open-modal to open the modal, we do not want to show only the modal with a blank page in the background. We want to show the modal on top of the previous page.

So we need to pass the previous location object to `<Routes />` instead of using the current location object by default. Thus `<Routes />` thinks we are on the same page (previous location). For example, we are on the home page `http://localhost:3000/`. When we click on the link to open the modal, the position changes to `https://localhost:3000/modal` but `<Routes />` thinks the position has never changed.

Remember? We passed a state attribute in the `main.js` file, which had a background object. If there is a background object, upon clicking the link to open the modal, the model will be conditionally shown by the second `<Routes />` container, and the homepage will be shown as background by the first `<Routes />` container.

But when you directly visit the modal page, we will only see the homepage even though we have added the modal route in the first <Routes /> container. You can show the model or any other component for the /model path by simply adding the `<Outlet />` element to the `Main.js` file. For this demo, we will show the model.

### Main.js

#### Add `<Outlet/>`

```
import { Link, Outlet, useLocation } from "react-router-dom";

export const Main = () => {
  const location = useLocation();
  return (
    <div>
      <h2>Create contextual modal navigation</h2>
      <Link to="modal" state={{ background: location }}>
        Open Modal
      </Link>
      // Here is the <Outlet/>
      <Outlet />
    </div>
  );
};
```

<p align="center">
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1650027952727/5y3_wxYoW.gif" />
</p>

I hope, I was able to explain this. If you have any questions or suggestions about this blog, reach out to me via [Twitter](https://www.twitter.com/devmdmamun).

#### [Live Demo.](https://dreamy-macaron-0c86da.netlify.app)

#### [Source code on GitHub](https://github.com/devmdmamun/contextual-modal-navigation-with-react-router)

### References

[Official React Router modal example](https://reactrouter.com/docs/en/v6/examples/modal)

[Building a modal module for React with React-Router V5 by Doğacan Bilgili](https://blog.logrocket.com/building-a-modal-module-for-react-with-react-router/)
