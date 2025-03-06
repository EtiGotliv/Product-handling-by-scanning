**Project Specification Document**

## **1. Project Overview**
### **1.1 Description**
The project is a product order management system that allows customers to fill out an order form via Google Forms. The system will store order details and allow employees to track, update, and manage the order status through a dashboard. Employees can mark items as "Embroidered" or "Packed" either manually or by scanning a label.

### **1.2 Goals**
- Automate order collection and tracking
- Enable easy order retrieval and status updates
- Provide barcode/text scanning for quick status updates
- Store and categorize orders based on city and product color
- Ensure efficient searching and filtering of orders

---

## **2. Features & Requirements**
### **2.1 Customer Order Process**
- Customers fill out a Google Form with the following fields:
  - **Full Name**
  - **Phone Number**
  - **Product Color**
  - **City**
  - **Embroidery Name**
- Form submissions are automatically stored in a **database or Google Sheets**

### **2.2 Order Management Dashboard**
- Displays a table of all orders with sortable columns (Name, City, Product Color, Status)
- Buttons to mark an order as **"Embroidered"** or **"Packed"**
- Search functionality to find orders by name, city, or color
- Orders are categorized by **city** (each city has a separate list)
- Status updates can be made via:
  - **Manual selection**
  - **Barcode/text scanning**
  
### **2.3 Barcode/Text Scanning**
- Employee scans a label containing the **customer’s name**
- If multiple customers have the same name, the system prompts for **City** or **Product Color**
- The system automatically updates the corresponding order’s status
- If scanning is not possible, employees can manually search and update orders

### **2.4 Database & Order Organization**
- Orders are categorized into separate lists based on **City**
- Each order has a **unique identifier** (`Full Name - City - Color`)
- The system should prevent duplicate orders by checking for existing records
- Orders are **sorted alphabetically** for efficient search

---

## **3. Technology Stack**
| Component   | Technology |
|------------|-----------|
| Backend    | Node.js (Express.js) |
| Database   | MongoDB / Firestore / Google Sheets API |
| Frontend   | React.js / Vue.js / HTML & Tailwind CSS |
| Scanning   | QuaggaJS / ZXing.js |
| Deployment | Railway / Vercel / AWS |

---

## **4. System Flow & Architecture**
### **4.1 Data Flow**
1. Customer submits an order via Google Forms.
2. The order data is stored in a **database or Google Sheets**.
3. The admin dashboard retrieves and displays order data.
4. Employees update the order status manually or via barcode scanning.
5. The system updates the order's status in the database.
6. Orders are categorized and displayed according to the city.

### **4.2 API Endpoints**
- `POST /orders` → Add a new order
- `GET /orders?city=XYZ` → Retrieve orders by city
- `PATCH /orders/:id/status` → Update order status
- `GET /orders/search?name=XYZ` → Search orders by name

---



