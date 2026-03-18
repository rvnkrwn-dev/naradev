---
title_id: "React Hooks dan Pola"
title_en: "React Hooks and Patterns"
slug: "react-hooks-and-patterns"
date: "2026-03-18T12:57:00.000Z"
description_id: "Pelajari cara menggunakan React Hooks dan pola terbaik untuk meningkatkan pengembangan frontend Anda."
description_en: "Learn how to use React Hooks and best practices to enhance your frontend development."
tags:
  - css
  - frontend
  - hooks
  - javascript
  - react
status: "published"
authorId: "usr_ai_frontend"
cover: "https://raw.githubusercontent.com/rvnkrwn-dev/naradev/dev/public/covers/react-hooks-and-patterns.png"
---

<!-- lang:id -->
# React Hooks dan Pola

## Pengenalan
React Hooks adalah fitur yang diperkenalkan di React 16.8 yang memungkinkan Anda menggunakan state dan fitur React lainnya tanpa menulis kelas. Ini sangat mempermudah pengelolaan state dan efek samping di dalam komponen fungsional. Dalam artikel ini, kita akan membahas cara menggunakan hooks dan pola-pola terbaik yang dapat Anda terapkan dalam proyek Anda.

### Apa itu Hooks?
Hooks adalah fungsi yang memungkinkan Anda “mengaitkan” ke state dan lifecycle React dari komponen fungsional. Mari kita lihat beberapa hooks yang paling sering digunakan:

- **useState**: untuk mengelola state.
- **useEffect**: untuk efek samping (side effects).
- **useContext**: untuk mengelola konteks global.

## Penggunaan useState
### Contoh Penggunaan
Berikut adalah contoh penggunaan `useState` untuk mengelola state dalam sebuah komponen.

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Tambah</button>
    </div>
  );
}
```

Dalam contoh di atas, kita membuat komponen sederhana yang menampilkan angka dan tombol untuk menambah nilai.

## Penggunaan useEffect
### Efek Samping
`useEffect` memungkinkan Anda untuk melakukan efek samping dalam komponen seperti mengambil data, menyetel timer, atau memperbarui DOM. Berikut adalah contohnya:

```javascript
import React, { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Timer: {seconds} detik</div>;
}
```

Di sini, kita membuat timer yang memperbarui setiap detik.

## Mengelola Konteks dengan useContext
### Apa itu useContext?
`useContext` memungkinkan Anda untuk mengakses nilai dari konteks React tanpa perlu menggunakan komponen pembungkus.

### Contoh Penggunaan useContext
```javascript
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function ThemedComponent() {
  const theme = useContext(ThemeContext);
  return <div>Tema saat ini: {theme}</div>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedComponent />
    </ThemeContext.Provider>
  );
}
```

Pada contoh di atas, `ThemedComponent` dapat mengakses nilai tema dari `ThemeContext` tanpa harus menggunakan komponen kelas.

## Pola Terbaik Menggunakan Hooks
### 1. Membagi Logika dengan Custom Hooks
Custom hooks memungkinkan Anda untuk membagi logika stateful menjadi fungsi yang dapat digunakan kembali. Contoh:

```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}
```

Dengan `useFetch`, Anda dapat mengambil data dari API hanya dengan memanggil hook ini di dalam komponen.

## Kesimpulan
React Hooks membawa banyak kemudahan dalam pengembangan aplikasi React. Dengan memahami penggunaan dasar dan pola terbaik seperti penggunaan custom hooks, Anda dapat meningkatkan produktivitas dan keterbacaan kode Anda. Mulailah berlatih dan eksplorasi lebih lanjut untuk mendapatkan manfaat maksimal dari React Hooks.

## Ayo Mencoba!
Ini saatnya bagi Anda untuk mencoba menggunakan React Hooks di proyek Anda. Bagikan pengalaman Anda dan jangan ragu untuk bertanya jika Anda menemui kesulitan!

<!-- lang:en -->
# React Hooks and Patterns

## Introduction
React Hooks were introduced in React 16.8, allowing you to use state and other React features without writing classes. This greatly simplifies state management and side effects in functional components. In this article, we will discuss how to use hooks and the best patterns you can apply to your projects.

### What are Hooks?
Hooks are functions that let you “hook into” state and lifecycle React features from functional components. Let’s take a look at some of the most commonly used hooks:

- **useState**: for managing state.
- **useEffect**: for side effects.
- **useContext**: for managing global context.

## Using useState
### Example Usage
Here’s an example of using `useState` to manage state in a component.

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  );
}
```

In the above example, we create a simple component that displays a number and a button to increment the value.

## Using useEffect
### Side Effects
`useEffect` allows you to perform side effects in components, such as fetching data, setting timers, or updating the DOM. Here’s an example:

```javascript
import React, { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Timer: {seconds} seconds</div>;
}
```

Here, we create a timer that updates every second.

## Managing Context with useContext
### What is useContext?
`useContext` allows you to access values from the React Context without having to use wrapper components.

### Example of Using useContext
```javascript
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function ThemedComponent() {
  const theme = useContext(ThemeContext);
  return <div>Current theme: {theme}</div>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedComponent />
    </ThemeContext.Provider>
  );
}
```

In the above example, `ThemedComponent` can access the theme value from `ThemeContext` without needing a class component.

## Best Patterns for Using Hooks
### 1. Sharing Logic with Custom Hooks
Custom hooks allow you to share stateful logic as reusable functions. Here’s an example:

```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}
```

With `useFetch`, you can fetch data from an API just by calling this hook inside a component.

## Conclusion
React Hooks bring a lot of convenience to React application development. By understanding the basic usage and best patterns like using custom hooks, you can improve the productivity and readability of your code. Start practicing and exploring further to reap the maximum benefits from React Hooks.

## Try It Out!
Now it’s your turn to start using React Hooks in your projects. Share your experiences and feel free to ask if you encounter any difficulties!
