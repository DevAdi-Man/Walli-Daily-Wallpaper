# Walli - Open Source Wallpaper App

![Walli Banner](https://your-image-link-here.com)

Walli is an open-source wallpaper app built with **React Native** and **TypeScript**, designed to provide high-quality wallpapers sourced from the **Pinterest API**. It offers a smooth and customizable user experience with a minimalistic and intuitive UI.

## Features

✅ Browse and download high-resolution wallpapers  
✅ Search wallpapers by keywords  
<!-- ✅ Save favorite wallpapers for later   -->
<!-- ✅ Dark & Light mode support   -->
✅ Responsive UI for both Android & iOS  
✅ Open-source and customizable  

## Tech Stack

- **React Native** (for cross-platform mobile development)
- **TypeScript** (for type safety and better maintainability)
<!-- - **Zustand** (for state management) -->
<!-- - **Firebase** (for authentication and storage, if applicable) -->
- **Pinterest API** (for fetching wallpapers)
- **React Navigation** (for seamless navigation)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Adityaraj002/Walli-Daily-Wallpaper.git
   cd walli
   ```

2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add your API keys (sorry but it is on ./src/api/index.ts ):
     ```env
     pixabay_KEY=your_api_key_here
     ```

4. Start the development server:
   ```sh
   npm run android   # For Android
   npm run ios       # For iOS (requires Mac and Xcode)
   ```

## Contribution

Walli is an open-source project, and contributions are welcome! 🚀

### How to Contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Add new feature"`).
4. Push to your branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the **MIT License**. Feel free to modify and use it as per your requirements.

## Contact

If you have any questions or suggestions, feel free to open an issue or reach out! 😊

