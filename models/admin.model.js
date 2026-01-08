import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  admin_picture_url: String,
  fullname: String,
  adminname: { type: String, required: true },
  password: { type: String, required: true },
  email: String,
  role: String,
  phone_number: String,
  status: { type: String, default: "active" },

  dashboard_admin: { slogan: String },
  orders_management: { slogan: String },
  services_management: { slogan: String },
  users_management: { slogan: String },
  invoice_management: { slogan: String },

  permissions: {
    can_manage_orders: { type: Boolean, default: false },
    can_manage_services: { type: Boolean, default: false },
    can_manage_users: { type: Boolean, default: false },
    can_manage_invoices: { type: Boolean, default: false },
    can_edit_dashboard: { type: Boolean, default: false }
  }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Admin =
  mongoose.models.Admin ||
  mongoose.model("Admin", AdminSchema, "admin");

export default Admin;
