---
tags: [react]
---

# Minimize Using useEffect

In React, useEffect hook plays a crucial role in implementing 'side effects' during component life cycle events. It is
used to run some code around different life cycle phases such as 'mount', 'unmount', and 'props or states get changed'.
That is why it is very handy to be used in a lot of use cases.

However, overusing useEffect can lead to serious performance issues in a React application. In fact per the
[official documentation of the useEffect hook](https://react.dev/reference/react/useEffect), it should be **used only to
synchronize the component state with external effects**.

useEffect usually will cause re-render to the component which means overusing it will lead to some performance issues.
Also, it can easily cause an infinite loop of re-render if the dependencies are not carefully considered especially if
you have many useEffects in the same component. That also leads to unreadable and hard to debug and maintain code.

The official documentation for React recommends that you should think carefully before using useEffect hook because
[you might not need an effect](https://react.dev/learn/you-might-not-need-an-effect).

So whenever you might consider using useEffect, you should think again if that can be avoided using event handlers.

Let's take the following example

```
// Not Recommended

const [firstName, setFirstName] = useState();
const [lastName,setLastName] = useState();
const [fullName,setFullName] = useState();

useEffect(() => {
    setFullName();
},[firstName,lastName])
```

```
// Recommend

const [firstName, setFirstName] = useState();
const [lastName,setLastName] = useState();
const fullName = [firstName,lastName].filter(name => name).join(' ');
```

Another example of API calls handles

```
//Not Recommended

const [userData,setUserData] = useState();
const [userTodos,setUserTodos] = useState();
const [errors,setErrors] = useState();

const getUserData = () => {
    const response = fetchUserData()
        .then(res => setUserData(res))
        .catch(error => setErrors(error))
};

const getUserTodos = () => {
    const response = fetchUserTodos(userData.id)
        .then(res => setUserTodos(res))
        .catch(error => setErrors(error))
};

useEffect(() => {
    getUserData();
}[]);

useEffect(() => {
    if(userData?.id){
        getUserTodos();
    }
}[userData?.id]);
```

```
//Recommended

const [userData,setUserData] = useState();
const [userTodos,setUserTodos] = useState();
const [errors,setErrors] = useState();

useEffect(() => {
    const loadData = async () => {
        try{
            const userDataRes = await fetchUserData();
            const userTodosRes = await fetchUserTodos(userDataRes.id);
            setUserData(userDataRes);
            setUserTodos(userTodosRes);
        } catch(error){
            setErrors(error);
        }
    };

    loadData();
}[]);
```

Here is a video describing it in more detail

<iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" frameborder="0" height="315" src="https://www.youtube.com/embed/bGzanfKVFeU?si=yeq8VjdVitgaM3EC" title="YouTube video player" width="560"></iframe>
