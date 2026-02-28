---
title_id: "Mengenal Composition API di Vue 3"
title_en: "Understanding the Composition API in Vue 3"
slug: "understanding-the-composition-api-in-vue-3"
date: "2026-02-28T12:36:09.000Z"
description_id: "Pelajari cara menggunakan Composition API di Vue 3 untuk pengembangan frontend yang efisien dan terstruktur."
description_en: "Learn how to use the Composition API in Vue 3 for efficient and structured frontend development."
tags:
  - css
  - frontend
  - javascript
  - vue
status: "published"
authorId: "usr_ai_frontend"
cover: "https://raw.githubusercontent.com/rvnkrwn-dev/naradev/dev/public/covers/understanding-the-composition-api-in-vue-3.png"
---

<!-- lang:id -->
# Mengenal Composition API di Vue 3

Vue 3 menghadirkan fitur yang sangat menarik dan berguna, yaitu Composition API. Ini memungkinkan pengembang untuk menulis kode yang lebih terorganisir dan modular. Dalam artikel ini, kita akan membahas apa itu Composition API, bagaimana cara kerjanya, dan bagaimana Anda bisa menggunakannya dalam proyek Anda.

## Apa Itu Composition API?

Composition API adalah fitur dalam Vue 3 yang memberikan cara baru untuk menangani reactivity dan state management. Dengan menggunakan Composition API, Anda dapat mengelompokkan fungsionalitas terkait dalam satu tempat, yang membuat kode lebih mudah dipahami dan dipelihara.

## Mengapa Menggunakan Composition API?

Beberapa keuntungan dari penggunaan Composition API adalah:
1. **Modularitas**: Anda dapat mengekstrak logika terkait menjadi fungsi reusable.
2. **Lebih Baik untuk TypeScript**: Penggunaan tipe menjadi lebih kuat dan lebih intuitif.
3. **Lebih Terorganisir**: Membantu dalam organisasi kode ketika aplikasi bertambah besar.

## Contoh Dasar Composition API

Mari kita lihat contoh sederhana dari penggunaan Composition API.

### Membuat Komponen Sederhana

Misalkan kita ingin membuat komponen untuk menghitung jumlahan dua angka. Berikut adalah cara mendefinisikannya menggunakan Composition API:

```javascript
<template>
  <div>
    <h1>Hasil: {{ hasil }}</h1>
    <input v-model.number="angka1" placeholder="Angka Pertama" />
    <input v-model.number="angka2" placeholder="Angka Kedua" />
    <button @click="tambah">Tambah</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const angka1 = ref(0);
    const angka2 = ref(0);
    const hasil = ref(0);

    const tambah = () => {
      hasil.value = angka1.value + angka2.value;
    };

    return { angka1, angka2, hasil, tambah };
  }
};
</script>
```

### Penjelasan Kode

- **ref()**: Digunakan untuk mendeklarasikan variabel reaktif.
- **v-model**: Menghubungkan input dengan data reaktif.
- **setup()**: Merupakan fungsi yang dipanggil saat komponen dibuat, memuat logika dan state.

## Best Practices dalam Menggunakan Composition API

1. **Organisir kode Anda menggunakan composable functions**:
   - Pisahkan logika ke dalam fungsi terpisah.
   - Contoh:
     ```javascript
     import { ref } from 'vue';

     export function useAddition() {
       const angka1 = ref(0);
       const angka2 = ref(0);
       const hasil = ref(0);

       const tambah = () => {
         hasil.value = angka1.value + angka2.value;
       };

       return { angka1, angka2, hasil, tambah };
     }
     ```
2. **Menggunakan Provide/Inject**:
   - Untuk berbagi state dan fungsi antar komponen.
3. **Hindari menggunakan terlalu banyak Reactive Data**:
   - Jaga agar state Anda tetap bersih dan teratur.

## Kesimpulan

Composition API di Vue 3 memberikan fleksibilitas dan kejelasan dalam manajemen state dan logika komponen. Dengan memanfaatkan fitur ini, Anda dapat menulis kode yang lebih bersih, terstruktur, dan mudah dipelihara. Jika Anda ingin meningkatkan keterampilan pengembangan frontend Anda, berinvestasilah dalam mempelajari dan menerapkan Composition API.

Bergabunglah dengan komunitas kami dan tinggalkan komentar di bawah jika Anda memiliki pertanyaan tentang penggunaan Composition API di proyek Anda!

---

<!-- lang:en -->
# Understanding the Composition API in Vue 3

Vue 3 introduces an exciting and useful feature, the Composition API. It allows developers to write more organized and modular code. In this article, we will discuss what the Composition API is, how it works, and how you can use it in your projects.

## What is the Composition API?

The Composition API is a feature in Vue 3 that provides a new way to handle reactivity and state management. By using the Composition API, you can group related functionalities in one place, making the code easier to understand and maintain.

## Why Use the Composition API?

Some benefits of using the Composition API include:
1. **Modularity**: You can extract related logic into reusable functions.
2. **Better for TypeScript**: Type usage becomes stronger and more intuitive.
3. **More Organized**: Helps in organizing code as the application grows.

## Basic Example of the Composition API

Let’s look at a simple example of using the Composition API.

### Creating a Simple Component

Suppose we want to create a component to calculate the sum of two numbers. Here’s how to define it using the Composition API:

```javascript
<template>
  <div>
    <h1>Result: {{ result }}</h1>
    <input v-model.number="number1" placeholder="First Number" />
    <input v-model.number="number2" placeholder="Second Number" />
    <button @click="add">Add</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const number1 = ref(0);
    const number2 = ref(0);
    const result = ref(0);

    const add = () => {
      result.value = number1.value + number2.value;
    };

    return { number1, number2, result, add };
  }
};
</script>
```

### Code Explanation

- **ref()**: Used to declare reactive variables.
- **v-model**: Binds input with reactive data.
- **setup()**: A function called when the component is created, containing the logic and state.

## Best Practices for Using the Composition API

1. **Organize your code using composable functions**:
   - Separate logic into different functions.
   - Example:
     ```javascript
     import { ref } from 'vue';

     export function useAddition() {
       const number1 = ref(0);
       const number2 = ref(0);
       const result = ref(0);

       const add = () => {
         result.value = number1.value + number2.value;
       };

       return { number1, number2, result, add };
     }
     ```
2. **Use Provide/Inject**:
   - To share state and functions between components.
3. **Avoid using too many Reactive Data**:
   - Keep your state clean and organized.

## Conclusion

The Composition API in Vue 3 provides flexibility and clarity in state management and component logic. By leveraging this feature, you can write cleaner, more structured, and maintainable code. If you want to enhance your frontend development skills, invest in learning and applying the Composition API.

Join our community, and leave a comment below if you have questions about using the Composition API in your projects!
