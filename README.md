# K-Means Visualizer

**An interactive and dynamic web-based visualization of the K-Means clustering algorithm, combining mathematical precision with captivating animations.** 

---

## 📜 **Project Overview**

This project visually demonstrates the **K-Means clustering algorithm** through smooth animations and progressive iterations. By splitting centroids and dynamically updating clusters, it showcases the power of machine learning algorithms in an intuitive and engaging way.

Key Highlights:
- Dynamic point generation and clustering.
- Progressive centroid splitting with adaptive deviations.
- Smooth animations and color transitions for clear understanding.

---

## 🛠️ **Technical Stack**

### **Frontend Frameworks/Libraries**:
- **[amCharts 5](https://www.amcharts.com/)**: For visualizing and animating the clustering process.
- **Bootstrap**: Ensures a responsive and user-friendly design.
- **JavaScript/TypeScript**: Powers the core clustering logic and animations.

### **File Structure**:
- **`index.html`**: The Bootstrap-based UI layout.
- **`style.css`**: Contains custom styles for a modern look.
- **`script.js`**: Implements clustering and animation logic.
- **`math.txt`**: Documents the mathematical foundations of the clustering algorithm.

---

## ✨ **Features**

### **Visualization Features**:
- Smooth animations of points and centroids.
- Color-coded clusters for clarity.
- Progressive splitting of centroids.

### **Algorithmic Features**:
- Adaptive deviation-based clustering.
- Dynamic point-to-centroid assignment.
- Scalable cluster count (based on configurable iterations).

### **UI/UX Features**:
- Modern, responsive design.
- Informative cards explaining the algorithm's progress.
- Interactive and intuitive interface.

---

## ⚙️ **How It Works**

### **Algorithm Breakdown**:
1. **Initial Setup**:
   - Generate points and place them around a single centroid.
   - Configure the maximum number of iterations (`MAX_ITERATIONS`).

2. **Clustering Process**:
   - At each iteration:
     - Centroids split into new positions with reduced deviations.
     - Points are assigned to the nearest centroid using **Euclidean distance**.
     - Clusters are color-coded based on membership.

3. **Animation Sequences**:
   - Points scatter from a central position.
   - Centroids split, move, and recalibrate dynamically.
   - Clusters smoothly transition to updated colors.

### **Mathematical Foundations**:
- **Euclidean Distance**: Calculates point-to-centroid proximity.
- **Vector Normalization**: Ensures smooth and adaptive positioning.
- **Adaptive Deviations**: Refines clustering precision with each iteration.

---

## 💻 **Implementation Details**

### **Dynamic Point Management**:
```javascript
let their_positions_after_movement = [];
let circles_objects = [];
let current_centroids = [initial_centroid_location];
```

### **Clustering Logic**:
```javascript
function performIteration() {
    // Splits centroids and recalculates cluster memberships
    // Updates point positions and colors
}
```

### **Animation Timing**:
- Initial Scatter: `200ms` delays between points.
- Cluster Updates: `2000ms` intervals for animations.
- Iteration Spacing: `4000ms` between centroid splits.

---

## 🎥 **Demo**

🎬 **Watch the Project in Action**: [Demo Video](#)  
(*Upload a video showing the clustering process, from the initial scatter to the final iteration.*)

---

## 📖 **Key Highlights**

1. **Progressive Splitting**:
   - Centroids split dynamically, forming a tree-like structure.
   - Adaptive deviations for increased precision.

2. **Dynamic Animations**:
   - Smooth transitions for both points and centroids.
   - Staggered animations create a visually appealing flow.

3. **Mathematical Precision**:
   - Optimized calculations for clustering accuracy.
   - Intuitive visuals to explain algorithmic complexity.

---

## 🚀 **Get Started**

1. Clone the repository:
   ```bash
   git clone https://github.com/DEVOLOPER-1/K-Means-Visualizer
   ```
2. Open `index.html` in your browser to view the visualization.
3. Modify `MAX_ITERATIONS` in `script.js` to adjust clustering depth.

---

## 🧠 **Future Improvements**
- Adding support for custom datasets.
- Implement additional clustering algorithms (e.g., DBSCAN, Hierarchical).
- Provide an interactive slider for real-time iteration control.

---

## 👨‍💻 **Author**
Crafted with passion and perseverance by [Your Name](#). 🚀
```

---