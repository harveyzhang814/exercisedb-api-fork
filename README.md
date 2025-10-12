<div align="center">
  <img src="https://cdn.exercisedb.dev/exercisedb/exercisedb_banner.png" alt="ExerciseDB API Banner" width="100%" height="600px" />
  
  <br />
  <br />
  <img src="https://cdn.exercisedb.dev/exercisedb/android-chrome-512x512.png" alt="ExerciseDB Logo" width="120" height="120" />

  <h3>🏋️‍♂️ Open Source Fitness Exercise Database API</h3>
  
  <p>
    <strong>1,300+ exercises</strong> • <strong>Fast & Modern</strong> • <strong>Developer-Friendly</strong> • <strong>100% Free</strong>
  </p>
  
  <p>
    <a href="#-license">
      <img src="https://img.shields.io/badge/License-AGPL--3.0-blue.svg?style=for-the-badge" alt="License: AGPL-3.0" />
    </a>
    <a href="https://github.com/exercisedb/exercisedb-api">
      <img src="https://img.shields.io/badge/Fork-Original%20Project-orange.svg?style=for-the-badge&logo=github" alt="Forked from Original" />
    </a>
  </p>
  
  <p>
    <span style="margin-right: 10px;">
      <a href="#-getting-started">
        <img src="https://img.shields.io/badge/Getting%20Started-2D2D2D?style=for-the-badge&logo=rocket&logoColor=white" alt="Getting Started" />
      </a>
    </span>
    <span style="margin-right: 10px;">
      <a href="#-dataset-information">
        <img src="https://img.shields.io/badge/Dataset%20Info-404040?style=for-the-badge&logo=database&logoColor=white" alt="Dataset Info" />
      </a>
    </span>
    <span>
      <a href="#-contributing">
        <img src="https://img.shields.io/badge/Contributing-5A5A5A?style=for-the-badge&logo=github&logoColor=white" alt="Contributing" />
      </a>
    </span>
  </p>

</div>

## 🏋🏼‍♀️ ExerciseDB API

> **Note:** This is a fork of the [original ExerciseDB API](https://github.com/exercisedb/exercisedb-api) project, maintained under the same AGPL-3.0 license.

ExerciseDB API is a **free, open-source fitness exercise database** featuring over **1,300 structured, high-quality exercises**. It delivers fast, modern, and scalable access to detailed exercise data—including targeted muscle groups, required equipment, GIF demonstrations, and step-by-step instructions. Perfect for developers building fitness apps, personal training platforms, and health tools without the constraints of commercial APIs.

**Perfect for:**

- 💪 Fitness app developers
- 🏃‍♀️ Health & wellness platforms
- 🎯 Personal training applications
- 📱 Workout planning tools
- 🔬 Fitness research projects

<br>

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/exercisedb/exercisedb-api.git
cd exercisedb-api

# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

### API Documentation

Once the server is running, you can access:
- **API Documentation**: `http://localhost:80/docs`
- **Home Page**: `http://localhost:80/`
- **API Endpoints**: `http://localhost:80/api/v1/...`

## 📊 Dataset Information

This open-source version includes:
- **1,300+ exercises** with detailed metadata
- **Body parts**: Chest, Back, Legs, Arms, Shoulders, and more
- **Equipment types**: Barbell, Dumbbell, Bodyweight, Machine, etc.
- **Target muscles**: Detailed muscle group information
- **GIF animations**: Visual demonstrations for each exercise

### Data Structure

Each exercise includes:
```json
{
  "bodyPart": "chest",
  "equipment": "barbell",
  "gifUrl": "https://example.com/exercise.gif",
  "id": "0001",
  "name": "bench press",
  "target": "pectorals",
  "secondaryMuscles": ["triceps", "deltoids"],
  "instructions": [
    "Step 1: Position yourself on the bench...",
    "Step 2: Lower the bar to your chest...",
    "Step 3: Press the bar back up..."
  ]
}
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add some amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

Please ensure your PR:
- Follows the existing code style
- Includes appropriate tests
- Updates documentation as needed

## 📬 Support & Community

<div align="left">

<p><strong>Need help or want to contribute?</strong></p>

- 🐛 **Report Issues**: [GitHub Issues](https://github.com/exercisedb/exercisedb-api/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/exercisedb/exercisedb-api/discussions)
- 📖 **Documentation**: Check the `/docs` endpoint when running the server
- ⭐ **Star the project** if you find it useful!

</div>

---

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

### Fork Information

This is a fork of the original [ExerciseDB API](https://github.com/exercisedb/exercisedb-api) project. The original project is also licensed under AGPL-3.0.

**Original Copyright Notice:**
```
ExerciseDB API - Fitness Exercise Database API
Copyright (C) 2025 AscendAPI
```

### Your Rights and Obligations

Under the AGPL-3.0 license:

- ✅ You are free to use, modify, and distribute this software
- ✅ You can use this software for commercial purposes
- ⚠️ **You must disclose the source code** of any modified versions
- ⚠️ **You must license any derivative works** under the same AGPL-3.0 license
- ⚠️ **If you run a modified version as a network service**, you must make the complete source code available to users of that service

### Network Service Requirement (AGPL Section 13)

If you modify this program and provide it as a network service (e.g., a web API), you **must** offer all users interacting with it remotely an opportunity to receive the complete source code of your modified version. This is the key difference between AGPL and GPL.

### Get the Source Code

The complete source code for this project is available at:
- **This Fork:** [Your Repository URL]
- **Original Project:** https://github.com/exercisedb/exercisedb-api

For the full license text, see the [LICENSE](./LICENSE) file.

For more information about AGPL-3.0, visit: https://www.gnu.org/licenses/agpl-3.0.html

---

**Note:** By using, modifying, or distributing this software, you agree to comply with the terms of the GNU Affero General Public License v3.0.
