import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  LayoutDashboard,
  Users,
  HeartHandshake,
  IndianRupee,
  Megaphone,
  CalendarDays,
  UsersRound,
  ClipboardList,
  ShieldCheck,
  Menu,
  X,
  RefreshCw,
  CheckCircle,
  XCircle,
  Eye,
  Ban,
  UserCheck,
  Activity,
  Plus,
  Pencil,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Globe,
  LogOut,
  WalletCards,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import "../../css/Admin.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/admin`;

const EXPENSE_API_URL = `${import.meta.env.VITE_API_URL}/api/admin/expenses`;

function Admin() {
  const { user, logout } = useAuth();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem("hs-admin-sidebar") === "collapsed";
    } catch {
      return false;
    }
  });

  const [navTip, setNavTip] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(
        "hs-admin-sidebar",
        sidebarCollapsed ? "collapsed" : "expanded",
      );
    } catch {
      // Storage unavailable — collapse still works for this session.
    }
  }, [sidebarCollapsed]);

  const showNavTip = (event, label) => {
    if (!sidebarCollapsed) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    setNavTip({ label, top: rect.top + rect.height / 2 });
  };

  const hideNavTip = () => {
    setNavTip(null);
  };

  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [donations, setDonations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  //expenses
  const [expenses, setExpenses] = useState([]);

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenseSaving, setExpenseSaving] = useState(false);

  const [expenseForm, setExpenseForm] = useState({
    campaignId: "",
    title: "",
    category: "",
    amount: "",
    description: "",
    expenseDate: "",
    receiptUrl: "",
  });

  /* =====================================================
     CAMPAIGN STATE
  ===================================================== */

  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [campaignSaving, setCampaignSaving] = useState(false);

  const [campaignForm, setCampaignForm] = useState({
    title: "",
    description: "",
    image: "",
    targetAmount: "",
    startDate: "",
    endDate: "",
    status: "DRAFT",
  });

  const [communitySearch, setCommunitySearch] = useState("");
  const [communityStatusFilter, setCommunityStatusFilter] = useState("ALL");
  const [communityVisibilityFilter, setCommunityVisibilityFilter] =
    useState("ALL");
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [communityModal, setCommunityModal] = useState(null);
  const [communityForm, setCommunityForm] = useState({
    name: "",
    description: "",
    image: "",
    city: "",
    state: "",
    country: "",
    isPublic: true,
    isActive: true,
  });
  const [savingCommunity, setSavingCommunity] = useState(false);

  /* =====================================================
     EVENT STATE
  ===================================================== */

  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventSaving, setEventSaving] = useState(false);

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    image: "",
    location: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    capacity: "",
  });

  /* =====================================================
     TASK STATE
  ===================================================== */

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskSaving, setTaskSaving] = useState(false);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",

    eventId: "",
    dueDate: "",
    status: "TODO",
  });

  /* =====================================================
     APPLICATION / UI STATE
  ===================================================== */

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationFilter, setApplicationFilter] = useState("PENDING");
  const [refreshing, setRefreshing] = useState(false);

  /* =====================================================
     API HELPER
  ===================================================== */

  const apiRequest = async (endpoint, options = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    let data = {};

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    return data;
  };
  /* =====================================================
   EXPENSE API HELPER
===================================================== */

  const expenseRequest = async (endpoint = "", options = {}) => {
    const response = await fetch(`${EXPENSE_API_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    let data = {};

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    return data;
  };
  /* =====================================================
     DASHBOARD
  ===================================================== */

  const loadDashboard = async () => {
    const data = await apiRequest("/dashboard");

    setDashboard(data);
  };

  /* =====================================================
     USERS
  ===================================================== */

  const loadUsers = async () => {
    const data = await apiRequest("/users");

    setUsers(data.users || []);
  };

  /* =====================================================
     VOLUNTEER APPLICATIONS
  ===================================================== */

  const loadApplications = async () => {
    const endpoint =
      applicationFilter === "ALL"
        ? "/volunteer-applications"
        : `/volunteer-applications?status=${applicationFilter}`;

    const data = await apiRequest(endpoint);

    setApplications(data.applications || []);
  };

  /* =====================================================
     DONATIONS
  ===================================================== */

  const loadDonations = async () => {
    const data = await apiRequest("/donations");

    setDonations(data.donations || []);
  };
  /* =====================================================
   EXPENSES
===================================================== */

  const loadExpenses = async () => {
    const data = await expenseRequest();

    setExpenses(data.expenses || []);
  };

  /* =====================================================
   CREATE / EDIT EXPENSE
===================================================== */

  const openCreateExpenseModal = () => {
    setEditingExpense(null);

    setExpenseForm({
      campaignId: "",
      title: "",
      category: "",
      amount: "",
      description: "",
      expenseDate: "",
      receiptUrl: "",
    });

    setShowExpenseModal(true);
  };

  const openEditExpenseModal = (expense) => {
    setEditingExpense(expense);

    setExpenseForm({
      campaignId: expense.campaignId ?? expense.campaign?.id ?? "",
      title: expense.title || "",
      category: expense.category || "",
      amount: expense.amount ?? "",
      description: expense.description || "",
      expenseDate: toDateTimeLocalValue(expense.expenseDate),
      receiptUrl: expense.receiptUrl || "",
    });

    setShowExpenseModal(true);
  };

  /* =====================================================
   EXPENSE FORM CHANGE
===================================================== */

  const handleExpenseFormChange = (e) => {
    const { name, value } = e.target;

    setExpenseForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  /* =====================================================
   SAVE EXPENSE
===================================================== */

  const handleSaveExpense = async (e) => {
    e.preventDefault();

    try {
      if (!expenseForm.campaignId) {
        throw new Error("Please select a campaign.");
      }

      if (!expenseForm.title.trim()) {
        throw new Error("Expense title is required.");
      }

      if (!expenseForm.category.trim()) {
        throw new Error("Expense category is required.");
      }

      const amount = Number(expenseForm.amount);

      if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Expense amount must be greater than zero.");
      }

      if (!expenseForm.expenseDate) {
        throw new Error("Expense date is required.");
      }

      const expenseDate = new Date(expenseForm.expenseDate);

      if (Number.isNaN(expenseDate.getTime())) {
        throw new Error("Please enter a valid expense date.");
      }

      setExpenseSaving(true);

      const payload = {
        campaignId: Number(expenseForm.campaignId),
        title: expenseForm.title.trim(),
        category: expenseForm.category.trim(),
        amount,
        description: expenseForm.description.trim() || null,
        expenseDate: expenseDate.toISOString(),
        receiptUrl: expenseForm.receiptUrl.trim() || null,
      };

      const endpoint = editingExpense ? `/${editingExpense.id}` : "";

      const method = editingExpense ? "PATCH" : "POST";

      const data = await expenseRequest(endpoint, {
        method,
        body: JSON.stringify(payload),
      });

      await loadExpenses();

      setShowExpenseModal(false);
      setEditingExpense(null);

      Swal.fire({
        icon: "success",
        title: editingExpense ? "Expense Updated" : "Expense Created",
        text:
          data.message ||
          (editingExpense
            ? "Expense updated successfully."
            : "Expense created successfully."),
        confirmButtonColor: "#D97706",
      });
    } catch (error) {
      console.error("Save expense error:", error);

      Swal.fire({
        icon: "error",
        title: "Unable to save expense",
        text: error.message || "Something went wrong.",
        confirmButtonColor: "#D97706",
      });
    } finally {
      setExpenseSaving(false);
    }
  };

  /* =====================================================
   DELETE EXPENSE
===================================================== */

  const handleDeleteExpense = async (expense) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete this expense?",
      text: `"${expense.title}" will be permanently deleted.`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const data = await expenseRequest(`/${expense.id}`, {
        method: "DELETE",
      });

      await loadExpenses();

      Swal.fire({
        icon: "success",
        title: "Expense Deleted",
        text: data.message || "Expense deleted successfully.",
        confirmButtonColor: "#D97706",
      });
    } catch (error) {
      console.error("Delete expense error:", error);

      Swal.fire({
        icon: "error",
        title: "Cannot delete expense",
        text: error.message || "Unable to delete this expense.",
        confirmButtonColor: "#D97706",
      });
    }
  };
  /* =====================================================
     CAMPAIGNS
  ===================================================== */

  const loadCampaigns = async () => {
    const data = await apiRequest("/campaigns");

    setCampaigns(data.campaigns || []);
  };

  /* =====================================================
     CREATE CAMPAIGN
  ===================================================== */

  const openCreateCampaignModal = () => {
    setEditingCampaign(null);

    setCampaignForm({
      title: "",
      description: "",
      image: "",
      targetAmount: "",
      startDate: "",
      endDate: "",
      status: "DRAFT",
    });

    setShowCampaignModal(true);
  };

  /* =====================================================
     EDIT CAMPAIGN
  ===================================================== */

  const openEditCampaignModal = (campaign) => {
    setEditingCampaign(campaign);

    setCampaignForm({
      title: campaign.title || "",
      description: campaign.description || "",
      image: campaign.image || "",
      targetAmount: campaign.targetAmount ?? "",
      startDate: toDateTimeLocalValue(campaign.startDate),
      endDate: toDateTimeLocalValue(campaign.endDate),
      status: campaign.status || "DRAFT",
    });

    setShowCampaignModal(true);
  };

  /* =====================================================
     CAMPAIGN FORM CHANGE
  ===================================================== */

  const handleCampaignFormChange = (e) => {
    const { name, value } = e.target;

    setCampaignForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================================
     SAVE CAMPAIGN
  ===================================================== */

  const handleSaveCampaign = async (e) => {
    e.preventDefault();

    try {
      if (!campaignForm.title.trim()) {
        throw new Error("Campaign title is required.");
      }

      const targetAmount = Number(campaignForm.targetAmount);

      if (!Number.isFinite(targetAmount) || targetAmount <= 0) {
        throw new Error("Target amount must be greater than zero.");
      }

      let startDate = null;
      let endDate = null;

      if (campaignForm.startDate) {
        startDate = new Date(campaignForm.startDate);

        if (Number.isNaN(startDate.getTime())) {
          throw new Error("Please enter a valid campaign start date.");
        }
      }

      if (campaignForm.endDate) {
        endDate = new Date(campaignForm.endDate);

        if (Number.isNaN(endDate.getTime())) {
          throw new Error("Please enter a valid campaign end date.");
        }
      }

      if (startDate && endDate && endDate <= startDate) {
        throw new Error("Campaign end date must be after the start date.");
      }

      setCampaignSaving(true);

      const payload = {
        title: campaignForm.title.trim(),
        description: campaignForm.description.trim() || null,
        image: campaignForm.image.trim() || null,
        targetAmount,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
        status: campaignForm.status,
      };

      const endpoint = editingCampaign
        ? `/campaigns/${editingCampaign.id}`
        : "/campaigns";

      const method = editingCampaign ? "PATCH" : "POST";

      const data = await apiRequest(endpoint, {
        method,
        body: JSON.stringify(payload),
      });

      await loadCampaigns();

      setShowCampaignModal(false);
      setEditingCampaign(null);

      Swal.fire({
        icon: "success",
        title: editingCampaign ? "Campaign Updated" : "Campaign Created",
        text:
          data.message ||
          (editingCampaign
            ? "Campaign updated successfully."
            : "Campaign created successfully."),
        confirmButtonColor: "#D97706",
      });
    } catch (error) {
      console.error("Save campaign error:", error);

      Swal.fire({
        icon: "error",
        title: "Unable to save campaign",
        text: error.message || "Something went wrong.",
        confirmButtonColor: "#D97706",
      });
    } finally {
      setCampaignSaving(false);
    }
  };

  /* =====================================================
     CANCEL CAMPAIGN
  ===================================================== */

  const handleCancelCampaign = async (campaign) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Cancel this campaign?",
      text: `"${campaign.title}" will no longer be an active fundraising campaign.`,
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "Keep Campaign",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const data = await apiRequest(`/campaigns/${campaign.id}/cancel`, {
        method: "PATCH",
      });

      await loadCampaigns();

      Swal.fire({
        icon: "success",
        title: "Campaign Cancelled",
        text: data.message || "Campaign cancelled successfully.",
        confirmButtonColor: "#D97706",
      });
    } catch (error) {
      console.error("Cancel campaign error:", error);

      Swal.fire({
        icon: "error",
        title: "Unable to cancel campaign",
        text: error.message || "Something went wrong.",
        confirmButtonColor: "#D97706",
      });
    }
  };

  /* =====================================================
     DELETE CAMPAIGN
  ===================================================== */

  const handleDeleteCampaign = async (campaign) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete this campaign?",
      text: `"${campaign.title}" will be permanently deleted if allowed by the database.`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const data = await apiRequest(`/campaigns/${campaign.id}`, {
        method: "DELETE",
      });

      await loadCampaigns();

      Swal.fire({
        icon: "success",
        title: "Campaign Deleted",
        text: data.message || "Campaign deleted successfully.",
        confirmButtonColor: "#D97706",
      });
    } catch (error) {
      console.error("Delete campaign error:", error);

      Swal.fire({
        icon: "error",
        title: "Cannot delete campaign",
        text: error.message || "Campaign could not be deleted.",
        confirmButtonColor: "#D97706",
      });
    }
  };

  /* =====================================================
     EVENT LOAD
  ===================================================== */

  const loadEvents = async () => {
    const data = await apiRequest("/events");

    setEvents(data.events || []);
  };

  /* =====================================================
     CREATE EVENT
  ===================================================== */

  const openCreateEventModal = () => {
    setEditingEvent(null);

    setEventForm({
      title: "",
      description: "",
      image: "",
      location: "",
      city: "",
      state: "",
      startDate: "",
      endDate: "",
      capacity: "",
    });

    setShowEventModal(true);
  };

  /* =====================================================
     EDIT EVENT
  ===================================================== */

  const openEditEventModal = (event) => {
    setEditingEvent(event);

    setEventForm({
      title: event.title || "",
      description: event.description || "",
      image: event.image || "",
      location: event.location || "",
      city: event.city || "",
      state: event.state || "",
      startDate: toDateTimeLocalValue(event.startDate),
      endDate: toDateTimeLocalValue(event.endDate),
      capacity: event.capacity ?? "",
    });

    setShowEventModal(true);
  };

  /* =====================================================
     EVENT FORM CHANGE
  ===================================================== */

  const handleEventFormChange = (e) => {
    const { name, value } = e.target;

    setEventForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================================
     SAVE EVENT
  ===================================================== */

  const handleSaveEvent = async (e) => {
    e.preventDefault();

    try {
      if (!eventForm.title.trim()) {
        throw new Error("Event title is required.");
      }

      if (!eventForm.startDate) {
        throw new Error("Start date and time are required.");
      }

      if (!eventForm.endDate) {
        throw new Error(
          "End date and time are required so the event can automatically become completed.",
        );
      }

      const startDate = new Date(eventForm.startDate);
      const endDate = new Date(eventForm.endDate);

      if (
        Number.isNaN(startDate.getTime()) ||
        Number.isNaN(endDate.getTime())
      ) {
        throw new Error("Please enter valid event dates.");
      }

      if (endDate <= startDate) {
        throw new Error(
          "End date and time must be after the start date and time.",
        );
      }

      if (
        eventForm.capacity !== "" &&
        (!Number.isInteger(Number(eventForm.capacity)) ||
          Number(eventForm.capacity) < 1)
      ) {
        throw new Error("Capacity must be a positive whole number.");
      }

      setEventSaving(true);

      const payload = {
        title: eventForm.title.trim(),
        description: eventForm.description.trim() || null,
        image: eventForm.image.trim() || null,
        location: eventForm.location.trim() || null,
        city: eventForm.city.trim() || null,
        state: eventForm.state.trim() || null,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        capacity: eventForm.capacity === "" ? null : Number(eventForm.capacity),
      };

      const endpoint = editingEvent ? `/events/${editingEvent.id}` : "/events";

      const method = editingEvent ? "PATCH" : "POST";

      const data = await apiRequest(endpoint, {
        method,
        body: JSON.stringify(payload),
      });

      await loadEvents();

      setShowEventModal(false);
      setEditingEvent(null);

      Swal.fire({
        icon: "success",
        title: editingEvent ? "Event Updated" : "Event Created",
        text:
          data.message ||
          (editingEvent
            ? "Event updated successfully."
            : "Event created successfully."),
        confirmButtonColor: "#D97706",
      });
    } catch (error) {
      console.error("Save event error:", error);

      Swal.fire({
        icon: "error",
        title: "Unable to save event",
        text: error.message || "Something went wrong.",
        confirmButtonColor: "#D97706",
      });
    } finally {
      setEventSaving(false);
    }
  };

  /* =====================================================
     CANCEL EVENT
  ===================================================== */

  const handleCancelEvent = async (event) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Cancel this event?",
      text: `"${event.title}" will no longer be available as an active event.`,
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel Event",
      cancelButtonText: "Keep Event",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const data = await apiRequest(`/events/${event.id}/cancel`, {
        method: "PATCH",
      });

      await loadEvents();

      Swal.fire({
        icon: "success",
        title: "Event Cancelled",
        text: data.message || "Event cancelled successfully.",
        confirmButtonColor: "#D97706",
      });
    } catch (error) {
      console.error("Cancel event error:", error);

      Swal.fire({
        icon: "error",
        title: "Unable to cancel event",
        text: error.message || "Something went wrong.",
        confirmButtonColor: "#D97706",
      });
    }
  };

  /* =====================================================
     DELETE EVENT
  ===================================================== */

  const handleDeleteEvent = async (event) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete this event?",
      text: `"${event.title}" will be permanently deleted if allowed by the database.`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const data = await apiRequest(`/events/${event.id}`, {
        method: "DELETE",
      });

      await loadEvents();

      Swal.fire({
        icon: "success",
        title: "Event Deleted",
        text: data.message || "Event deleted successfully.",
        confirmButtonColor: "#D97706",
      });
    } catch (error) {
      console.error("Delete event error:", error);

      Swal.fire({
        icon: "error",
        title: "Cannot delete event",
        text: error.message || "Unable to delete this event.",
        confirmButtonColor: "#D97706",
      });
    }
  };

  /* =====================================================
     TASKS
  ===================================================== */

  const loadTasks = async () => {
    const data = await apiRequest("/tasks");

    setTasks(data.tasks || []);
  };

  /* =====================================================
     CREATE TASK MODAL
  ===================================================== */

  const openCreateTaskModal = () => {
    setEditingTask(null);

    setTaskForm({
      title: "",
      description: "",

      eventId: "",
      dueDate: "",
      status: "TODO",
    });

    setShowTaskModal(true);
  };

  /* =====================================================
     EDIT TASK MODAL
  ===================================================== */

  const openEditTaskModal = (task) => {
    setEditingTask(task);

    setTaskForm({
      title: task.title || "",
      description: task.description || "",
      eventId: task.eventId != null ? String(task.eventId) : "",
      dueDate: toDateTimeLocalValue(task.dueDate),
      status: task.status || "TODO",
    });

    setShowTaskModal(true);
  };

  /* =====================================================
     TASK FORM CHANGE
  ===================================================== */

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;

    setTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================================
   SAVE TASK
===================================================== */

  const handleSaveTask = async (e) => {
    e.preventDefault();

    try {
      if (!taskForm.title.trim()) {
        throw new Error("Task title is required.");
      }

      setTaskSaving(true);

      const payload = {
        title: taskForm.title.trim(),

        description: taskForm.description.trim() || null,

        eventId: taskForm.eventId === "" ? null : Number(taskForm.eventId),

        dueDate: taskForm.dueDate
          ? new Date(taskForm.dueDate).toISOString()
          : null,

        status: taskForm.status,
      };

      const endpoint = editingTask ? `/tasks/${editingTask.id}` : "/tasks";

      const method = editingTask ? "PATCH" : "POST";

      const data = await apiRequest(endpoint, {
        method,
        body: JSON.stringify(payload),
      });

      await loadTasks();

      setShowTaskModal(false);
      setEditingTask(null);

      setTaskForm({
        title: "",
        description: "",
        eventId: "",
        dueDate: "",
        status: "TODO",
      });

      Swal.fire({
        icon: "success",
        title: editingTask ? "Task Updated" : "Task Created",
        text:
          data.message ||
          (editingTask
            ? "Task updated successfully."
            : "Task created successfully."),
        confirmButtonColor: "#D97706",
      });
    } catch (error) {
      console.error("Save task error:", error);

      Swal.fire({
        icon: "error",
        title: "Unable to save task",
        text: error.message || "Something went wrong.",
        confirmButtonColor: "#D97706",
      });
    } finally {
      setTaskSaving(false);
    }
  };

  /* =====================================================
     DELETE TASK
  ===================================================== */

  const handleDeleteTask = async (task) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete this task?",
      text: `"${task.title}" will be permanently deleted.`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const data = await apiRequest(`/tasks/${task.id}`, {
        method: "DELETE",
      });

      await loadTasks();

      Swal.fire({
        icon: "success",
        title: "Task Deleted",
        text: data.message || "Task deleted successfully.",
        confirmButtonColor: "#D97706",
      });
    } catch (error) {
      console.error("Delete task error:", error);

      Swal.fire({
        icon: "error",
        title: "Cannot delete task",
        text: error.message || "Unable to delete this task.",
        confirmButtonColor: "#D97706",
      });
    }
  };

  /* =====================================================
     COMMUNITIES
  ===================================================== */

  const loadCommunities = async () => {
    const data = await apiRequest("/communities");

    setCommunities(data.communities || []);
  };

  const loadCommunityDetails = async (id) => {
    const data = await apiRequest(`/communities/${id}`);

    setSelectedCommunity(data.community || null);

    return data.community;
  };

  /* =====================================================
     AUDIT LOGS
  ===================================================== */

  const loadAuditLogs = async () => {
    const data = await apiRequest("/audit-logs");

    setAuditLogs(data.logs || []);
  };

  /* =====================================================
     LOAD SECTION
  ===================================================== */

  const loadSection = async (section) => {
    setLoading(true);

    try {
      switch (section) {
        case "dashboard":
          await loadDashboard();
          break;

        case "users":
          await loadUsers();
          break;

        case "volunteers":
          await loadApplications();
          break;

        case "donations":
          await loadDonations();
          break;

        case "expenses":
          await Promise.all([loadExpenses(), loadCampaigns()]);
          break;

        case "campaigns":
          await loadCampaigns();
          break;

        case "events":
          await loadEvents();
          break;

        case "tasks":
          await Promise.all([loadTasks(), loadUsers(), loadEvents()]);
          break;

        case "communities":
          await loadCommunities();
          break;

        case "audit":
          await loadAuditLogs();
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(`Failed to load ${section}:`, error);

      Swal.fire({
        icon: "error",
        title: "Unable to load data",
        text: error.message || "Something went wrong.",
        confirmButtonColor: "#D97706",
      });
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    loadSection("dashboard");
  }, []);

  useEffect(() => {
    if (activeSection !== "dashboard") {
      loadSection(activeSection);
    }
  }, [activeSection, applicationFilter]);

  /* =====================================================
     REFRESH
  ===================================================== */

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      await loadSection(activeSection);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Dashboard refreshed",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  /* =====================================================
     APPROVE APPLICATION
  ===================================================== */

  const approveApplication = async (application) => {
    const result = await Swal.fire({
      title: "Approve Volunteer?",
      text: `Approve ${application.user.name} as a volunteer?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await apiRequest(`/volunteer-applications/${application.id}/approve`, {
        method: "PATCH",
        body: JSON.stringify({
          adminRemarks: "Approved by administrator.",
        }),
      });

      setSelectedApplication(null);

      await Promise.all([loadApplications(), loadDashboard()]);

      await Swal.fire({
        title: "Approved",
        text: `${application.user.name} is now a volunteer.`,
        icon: "success",
        confirmButtonColor: "#e87524",
      });
    } catch (error) {
      console.error("Approval error:", error);

      await Swal.fire({
        title: "Approval Failed",
        text: error.message || "Unable to approve this application.",
        icon: "error",
        confirmButtonColor: "#e87524",
      });
    }
  };

  /* =====================================================
     REJECT APPLICATION
  ===================================================== */

  const rejectApplication = async (application) => {
    const { value: remarks } = await Swal.fire({
      title: "Reject Application",
      input: "textarea",
      inputLabel: "Reason for rejection",
      inputPlaceholder: "Enter reason...",
      inputAttributes: {
        "aria-label": "Reason for rejection",
      },
      showCancelButton: true,
      confirmButtonText: "Reject Application",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",

      inputValidator: (value) => {
        if (!value?.trim()) {
          return "Please provide a reason.";
        }

        return undefined;
      },
    });

    if (!remarks) {
      return;
    }

    try {
      await apiRequest(`/volunteer-applications/${application.id}/reject`, {
        method: "PATCH",
        body: JSON.stringify({
          adminRemarks: remarks.trim(),
        }),
      });

      setSelectedApplication(null);

      await Promise.all([loadApplications(), loadDashboard()]);

      await Swal.fire({
        title: "Application Rejected",
        text: `${application.user.name}'s application has been rejected.`,
        icon: "success",
        confirmButtonColor: "#e87524",
      });
    } catch (error) {
      console.error("Rejection error:", error);

      await Swal.fire({
        title: "Rejection Failed",
        text: error.message || "Unable to reject this application.",
        icon: "error",
        confirmButtonColor: "#e87524",
      });
    }
  };

  /* =====================================================
     USER STATUS
  ===================================================== */

  const changeUserStatus = async (selectedUser, status) => {
    try {
      await apiRequest(`/users/${selectedUser.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({
          status,
        }),
      });

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "User status updated",
        showConfirmButton: false,
        timer: 1600,
      });

      await loadUsers();
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#e87524",
      });
    }
  };

  /* =====================================================
     COMMUNITIES — CREATE / EDIT MODAL
  ===================================================== */

  const openCreateCommunity = () => {
    setCommunityForm({
      name: "",
      description: "",
      image: "",
      city: "",
      state: "",
      country: "",
      isPublic: true,
      isActive: true,
    });

    setCommunityModal({ mode: "create" });
  };

  const openEditCommunity = (community) => {
    setCommunityForm({
      name: community.name || "",
      description: community.description || "",
      image: community.image || "",
      city: community.city || "",
      state: community.state || "",
      country: community.country || "",
      isPublic: community.isPublic !== false,
      isActive: community.isActive !== false,
    });

    setCommunityModal({ mode: "edit", id: community.id });
  };

  const saveCommunity = async () => {
    if (!communityForm.name.trim()) {
      Swal.fire({
        title: "Name Required",
        text: "Please enter a community name.",
        icon: "warning",
        confirmButtonColor: "#e87524",
      });

      return;
    }

    try {
      setSavingCommunity(true);

      if (communityModal.mode === "create") {
        await apiRequest("/communities", {
          method: "POST",
          body: JSON.stringify(communityForm),
        });

        Swal.fire({
          title: "Community Created",
          icon: "success",
          confirmButtonColor: "#e87524",
        });
      } else {
        await apiRequest(`/communities/${communityModal.id}`, {
          method: "PATCH",
          body: JSON.stringify(communityForm),
        });

        Swal.fire({
          title: "Community Updated",
          icon: "success",
          confirmButtonColor: "#e87524",
        });
      }

      setCommunityModal(null);

      await loadCommunities();
      await loadDashboard();

      if (selectedCommunity && communityModal.mode === "edit") {
        await loadCommunityDetails(communityModal.id);
      }
    } catch (error) {
      Swal.fire({
        title: "Save Failed",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#e87524",
      });
    } finally {
      setSavingCommunity(false);
    }
  };

  /* =====================================================
     COMMUNITIES — VIEW DETAILS
  ===================================================== */

  const viewCommunity = async (community) => {
    try {
      await loadCommunityDetails(community.id);
    } catch (error) {
      Swal.fire({
        title: "Unable to Load",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#e87524",
      });
    }
  };

  /* =====================================================
     COMMUNITIES — ACTIVATE / DEACTIVATE
  ===================================================== */

  const toggleCommunityStatus = async (community) => {
    const result = await Swal.fire({
      title: community.isActive
        ? "Deactivate Community?"
        : "Activate Community?",
      text: community.isActive
        ? `"${community.name}" will be hidden from new members.`
        : `"${community.name}" will become active again.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: community.isActive
        ? "Yes, Deactivate"
        : "Yes, Activate",
      cancelButtonText: "Cancel",
      confirmButtonColor: community.isActive ? "#dc2626" : "#16a34a",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await apiRequest(`/communities/${community.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ isActive: !community.isActive }),
      });

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: community.isActive
          ? "Community deactivated"
          : "Community activated",
        showConfirmButton: false,
        timer: 1600,
      });

      await loadCommunities();

      if (selectedCommunity?.id === community.id) {
        await loadCommunityDetails(community.id);
      }
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#e87524",
      });
    }
  };

  /* =====================================================
     COMMUNITIES — DELETE
  ===================================================== */

  const deleteCommunity = async (community) => {
    const result = await Swal.fire({
      title: "Delete Community?",
      text: `"${community.name}" and all its memberships will be permanently removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await apiRequest(`/communities/${community.id}`, {
        method: "DELETE",
      });

      Swal.fire({
        title: "Deleted",
        text: "Community removed successfully.",
        icon: "success",
        confirmButtonColor: "#e87524",
      });

      if (selectedCommunity?.id === community.id) {
        setSelectedCommunity(null);
      }

      await loadCommunities();
      await loadDashboard();
    } catch (error) {
      Swal.fire({
        title: "Delete Failed",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#e87524",
      });
    }
  };

  /* =====================================================
     COMMUNITIES — MEMBER ROLE / STATUS
  ===================================================== */

  const changeMemberField = async (member, field, value) => {
    if (!selectedCommunity) {
      return;
    }

    try {
      await apiRequest(
        `/communities/${selectedCommunity.id}/members/${member.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ [field]: value }),
        },
      );

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Member updated",
        showConfirmButton: false,
        timer: 1400,
      });

      await loadCommunityDetails(selectedCommunity.id);
      await loadCommunities();
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#e87524",
      });
    }
  };

  /* =====================================================
     COMMUNITIES — REMOVE MEMBER
  ===================================================== */

  const removeMember = async (member) => {
    if (!selectedCommunity) {
      return;
    }

    const result = await Swal.fire({
      title: "Remove Member?",
      text: `${member.user?.name || member.user?.email} will be removed from this community.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await apiRequest(
        `/communities/${selectedCommunity.id}/members/${member.id}`,
        {
          method: "DELETE",
        },
      );

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Member removed",
        showConfirmButton: false,
        timer: 1400,
      });

      await loadCommunityDetails(selectedCommunity.id);
      await loadCommunities();
    } catch (error) {
      Swal.fire({
        title: "Remove Failed",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#e87524",
      });
    }
  };

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const navigateSection = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = async () => {
    try {
      await logout();

      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  /* =====================================================
     FORMAT HELPERS
  ===================================================== */

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "—";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "—";
    }

    return parsed.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));
  };

  /* =====================================================
     DATE/TIME HELPER
  ===================================================== */

  const toDateTimeLocalValue = (date) => {
    if (!date) return "";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "";
    }

    const offset = parsed.getTimezoneOffset();

    return new Date(parsed.getTime() - offset * 60000)
      .toISOString()
      .slice(0, 16);
  };

  /* =====================================================
     EVENT STATUS
  ===================================================== */

  const getEventStatus = (event, now = new Date()) => {
    if (event.status === "CANCELLED") {
      return "CANCELLED";
    }

    const start = new Date(event.startDate);

    if (Number.isNaN(start.getTime())) {
      return "UPCOMING";
    }

    if (now < start) {
      return "UPCOMING";
    }

    if (!event.endDate) {
      return "ONGOING";
    }

    const end = new Date(event.endDate);

    if (Number.isNaN(end.getTime())) {
      return "ONGOING";
    }

    if (now >= end) {
      return "COMPLETED";
    }

    return "ONGOING";
  };

  /* =====================================================
     CAMPAIGN STATUS
  ===================================================== */

  const getCampaignStatus = (campaign, now = new Date()) => {
    if (campaign.status === "CANCELLED") {
      return "CANCELLED";
    }

    if (campaign.status === "DRAFT") {
      return "DRAFT";
    }

    if (campaign.status === "COMPLETED") {
      return "COMPLETED";
    }

    const start = campaign.startDate ? new Date(campaign.startDate) : null;

    const end = campaign.endDate ? new Date(campaign.endDate) : null;

    if (start && !Number.isNaN(start.getTime()) && now < start) {
      return "SCHEDULED";
    }

    if (end && !Number.isNaN(end.getTime()) && now >= end) {
      return "COMPLETED";
    }

    return "ACTIVE";
  };

  /* =====================================================
     SIDEBAR ITEMS
  ===================================================== */

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },

    {
      id: "volunteers",
      label: "Volunteer Applications",
      icon: HeartHandshake,
    },

    {
      id: "users",
      label: "Users",
      icon: Users,
    },

    {
      id: "donations",
      label: "Donations",
      icon: IndianRupee,
    },

    {
      id: "expenses",
      label: "Expenses",
      icon: WalletCards,
    },

    {
      id: "campaigns",
      label: "Campaigns",
      icon: Megaphone,
    },

    {
      id: "events",
      label: "Events",
      icon: CalendarDays,
    },

    {
      id: "tasks",
      label: "Tasks",
      icon: ClipboardList,
    },

    {
      id: "communities",
      label: "Communities",
      icon: UsersRound,
    },

    {
      id: "audit",
      label: "Audit Logs",
      icon: ShieldCheck,
    },
  ];

  /* =====================================================
     RENDER DASHBOARD
  ===================================================== */

  const renderDashboard = () => {
    if (!dashboard) {
      return null;
    }

    const stats = dashboard.stats;

    return (
      <div className="admin-dashboard-home">
        <div className="admin-stat-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Users size={22} />
            </div>

            <div>
              <span>Total Users</span>
              <strong>{stats.totalUsers}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <HeartHandshake size={22} />
            </div>

            <div>
              <span>Volunteers</span>
              <strong>{stats.totalVolunteers}</strong>
            </div>
          </div>

          <div className="admin-stat-card admin-stat-warning">
            <div className="admin-stat-icon">
              <ClipboardList size={22} />
            </div>

            <div>
              <span>Pending Applications</span>

              <strong>{stats.pendingVolunteerApplications}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <IndianRupee size={22} />
            </div>

            <div>
              <span>Total Donations</span>

              <strong>
                {formatCurrency(
                  stats.totalDonationAmount ?? stats.donationAmount,
                )}
              </strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Megaphone size={22} />
            </div>

            <div>
              <span>Active Campaigns</span>

              <strong>{stats.activeCampaigns}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <CalendarDays size={22} />
            </div>

            <div>
              <span>Upcoming Events</span>

              <strong>{stats.upcomingEvents}</strong>
            </div>
          </div>
        </div>

        <div className="admin-dashboard-grid">
          {/* RECENT APPLICATIONS */}

          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h3>Recent Volunteer Applications</h3>

                <p>Latest requests waiting for review.</p>
              </div>

              <button
                className="admin-text-button"
                onClick={() => navigateSection("volunteers")}
              >
                View All
              </button>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {(
                    dashboard.recentApplications ||
                    dashboard.recentVolunteerApplications
                  )?.length ? (
                    (
                      dashboard.recentApplications ||
                      dashboard.recentVolunteerApplications
                    ).map((application) => (
                      <tr key={application.id}>
                        <td>{application.user.name}</td>

                        <td>{application.user.email}</td>

                        <td>
                          <span
                            className={`admin-status admin-status-${application.status.toLowerCase()}`}
                          >
                            {application.status}
                          </span>
                        </td>

                        <td>{formatDate(application.createdAt)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="admin-empty">
                        No applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* RECENT DONATIONS */}

          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h3>Recent Donations</h3>

                <p>Latest donation activity.</p>
              </div>

              <button
                className="admin-text-button"
                onClick={() => navigateSection("donations")}
              >
                View All
              </button>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Donor</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {dashboard.recentDonations?.length ? (
                    dashboard.recentDonations.map((donation) => (
                      <tr key={donation.id}>
                        <td>
                          {donation.isAnonymous
                            ? "Anonymous"
                            : donation.donorName ||
                              donation.user?.name ||
                              "Unknown"}
                        </td>

                        <td>{formatCurrency(donation.amount)}</td>

                        <td>
                          <span
                            className={`admin-status admin-status-${donation.status.toLowerCase()}`}
                          >
                            {donation.status}
                          </span>
                        </td>

                        <td>{formatDate(donation.donatedAt)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="admin-empty">
                        No donations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* =====================================================
     RENDER VOLUNTEERS
  ===================================================== */

  const renderVolunteers = () => {
    return (
      <div className="admin-content-section">
        <div className="admin-section-toolbar">
          <div>
            <h2>Volunteer Applications</h2>

            <p>Review and manage volunteer requests.</p>
          </div>

          <select
            className="admin-filter"
            value={applicationFilter}
            onChange={(e) => setApplicationFilter(e.target.value)}
          >
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="WITHDRAWN">Withdrawn</option>
            <option value="ALL">All Applications</option>
          </select>
        </div>

        <div className="admin-panel">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Contact</th>
                  <th>Skills</th>
                  <th>Preferred Area</th>
                  <th>Status</th>
                  <th>Applied</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {applications.length ? (
                  applications.map((application) => (
                    <tr key={application.id}>
                      <td>
                        <div className="admin-user-cell">
                          <strong>{application.user.name}</strong>

                          <small>#{application.id}</small>
                        </div>
                      </td>

                      <td>
                        <div>{application.user.email}</div>

                        <small>{application.user.phone || "No phone"}</small>
                      </td>

                      <td>{application.skills || "Not specified"}</td>

                      <td>{application.preferredArea || "Not specified"}</td>

                      <td>
                        <span
                          className={`admin-status admin-status-${application.status.toLowerCase()}`}
                        >
                          {application.status}
                        </span>
                      </td>

                      <td>{formatDate(application.createdAt)}</td>

                      <td>
                        <button
                          className="admin-icon-button"
                          title="View application"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye size={17} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="admin-empty">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  /* =====================================================
     RENDER USERS
  ===================================================== */

  const renderUsers = () => {
    return (
      <div className="admin-content-section">
        <div className="admin-section-toolbar">
          <div>
            <h2>Users</h2>

            <p>Manage registered users and account status.</p>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.length ? (
                  users.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="admin-user-cell">
                          <strong>{item.name}</strong>

                          <small>{item.email}</small>
                        </div>
                      </td>

                      <td>{item.phone || "—"}</td>

                      <td>
                        <span className="admin-role">{item.role}</span>
                      </td>

                      <td>
                        <span
                          className={`admin-status admin-status-${item.status.toLowerCase()}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>{formatDate(item.createdAt)}</td>

                      <td>
                        {item.id !== user?.id && (
                          <select
                            className="admin-small-select"
                            value={item.status}
                            onChange={(e) =>
                              changeUserStatus(item, e.target.value)
                            }
                          >
                            <option value="ACTIVE">Active</option>

                            <option value="INACTIVE">Inactive</option>

                            <option value="SUSPENDED">Suspended</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="admin-empty">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  /* =====================================================
     RENDER DONATIONS
  ===================================================== */

  const renderDonations = () => {
    return (
      <div className="admin-content-section">
        <div className="admin-section-toolbar">
          <div>
            <h2>Donations</h2>

            <p>Monitor donation and payment activity.</p>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Campaign</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {donations.length ? (
                  donations.map((donation) => (
                    <tr key={donation.id}>
                      <td>
                        {donation.isAnonymous
                          ? "Anonymous"
                          : donation.donorName ||
                            donation.user?.name ||
                            "Unknown"}
                      </td>

                      <td>
                        <strong>{formatCurrency(donation.amount)}</strong>
                      </td>

                      <td>{donation.paymentMethod || "—"}</td>

                      <td>{donation.campaign?.title || "General Donation"}</td>

                      <td>
                        <span
                          className={`admin-status admin-status-${donation.status.toLowerCase()}`}
                        >
                          {donation.status}
                        </span>
                      </td>

                      <td>{formatDate(donation.donatedAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="admin-empty">
                      No donations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  /* =====================================================
     RENDER CAMPAIGNS
  ===================================================== */

  const renderCampaigns = () => {
    const now = new Date();

    return (
      <div className="admin-content-section">
        <div className="admin-section-toolbar">
          <div>
            <h2>Campaigns</h2>

            <p>Create and manage fundraising campaigns.</p>
          </div>

          <button
            type="button"
            className="admin-primary-button"
            onClick={openCreateCampaignModal}
          >
            <Plus size={18} />
            Add Campaign
          </button>
        </div>

        <div className="admin-card-grid">
          {campaigns.map((campaign) => {
            const displayStatus = getCampaignStatus(campaign, now);

            const target = Number(campaign.targetAmount || 0);

            const raised = Number(campaign.raisedAmount || 0);

            const progress =
              target > 0
                ? Math.min(100, Math.max(0, (raised / target) * 100))
                : 0;

            return (
              <div
                className="admin-management-card admin-campaign-card"
                key={campaign.id}
              >
                {campaign.image && (
                  <div className="admin-campaign-image">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}

                <div className="admin-management-card-top">
                  <span
                    className={`admin-status admin-status-${displayStatus.toLowerCase()}`}
                  >
                    {displayStatus}
                  </span>

                  <span>#{campaign.id}</span>
                </div>

                <h3>{campaign.title}</h3>

                <p>{campaign.description || "No campaign description."}</p>

                <div className="admin-progress-info">
                  <span>Raised</span>

                  <strong>{formatCurrency(raised)}</strong>
                </div>

                <div className="admin-progress-track">
                  <div
                    className="admin-progress-bar"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div className="admin-campaign-progress-text">
                  {progress.toFixed(0)}% of target
                </div>

                <div className="admin-management-meta">
                  <span>Target: {formatCurrency(target)}</span>

                  <span>Donations: {campaign._count?.donations || 0}</span>
                </div>

                {(campaign.startDate || campaign.endDate) && (
                  <div className="admin-campaign-dates">
                    {campaign.startDate && (
                      <span>Start: {formatDateTime(campaign.startDate)}</span>
                    )}

                    {campaign.endDate && (
                      <span>End: {formatDateTime(campaign.endDate)}</span>
                    )}
                  </div>
                )}

                <div className="admin-campaign-actions">
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() => openEditCampaignModal(campaign)}
                  >
                    <Edit size={15} />
                    Edit
                  </button>

                  {displayStatus !== "COMPLETED" &&
                    displayStatus !== "CANCELLED" && (
                      <button
                        type="button"
                        className="admin-icon-button admin-danger-button"
                        title="Cancel campaign"
                        onClick={() => handleCancelCampaign(campaign)}
                      >
                        <XCircle size={16} />
                      </button>
                    )}

                  <button
                    type="button"
                    className="admin-icon-button admin-danger-button"
                    title="Delete campaign"
                    onClick={() => handleDeleteCampaign(campaign)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {!campaigns.length && (
          <div className="admin-empty-card">No campaigns found.</div>
        )}

        {showCampaignModal && (
          <div className="admin-modal-backdrop">
            <div className="admin-modal admin-campaign-modal">
              <div className="admin-modal-header">
                <div>
                  <span>CAMPAIGN MANAGEMENT</span>

                  <h2>{editingCampaign ? "Edit Campaign" : "Add Campaign"}</h2>
                </div>

                <button
                  type="button"
                  className="admin-modal-close"
                  onClick={() => setShowCampaignModal(false)}
                  disabled={campaignSaving}
                >
                  <X size={20} />
                </button>
              </div>

              <form
                className="admin-campaign-form"
                onSubmit={handleSaveCampaign}
              >
                <div className="admin-form-group">
                  <label>Campaign Title *</label>

                  <input
                    type="text"
                    name="title"
                    value={campaignForm.title}
                    onChange={handleCampaignFormChange}
                    placeholder="e.g. Diwali Food Support 2026"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Description</label>

                  <textarea
                    name="description"
                    value={campaignForm.description}
                    onChange={handleCampaignFormChange}
                    placeholder="Describe the purpose of this campaign..."
                    rows="4"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Campaign Image URL</label>

                  <input
                    type="url"
                    name="image"
                    value={campaignForm.image}
                    onChange={handleCampaignFormChange}
                    placeholder="https://example.com/campaign-image.jpg"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Target Amount *</label>

                  <input
                    type="number"
                    name="targetAmount"
                    value={campaignForm.targetAmount}
                    onChange={handleCampaignFormChange}
                    min="1"
                    step="0.01"
                    placeholder="e.g. 200000"
                    required
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Start Date & Time</label>

                    <input
                      type="datetime-local"
                      name="startDate"
                      value={campaignForm.startDate}
                      onChange={handleCampaignFormChange}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>End Date & Time</label>

                    <input
                      type="datetime-local"
                      name="endDate"
                      value={campaignForm.endDate}
                      onChange={handleCampaignFormChange}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={campaignForm.status}
                    onChange={handleCampaignFormChange}
                  >
                    <option value="DRAFT">Draft</option>

                    <option value="ACTIVE">Active / Published</option>

                    <option value="CANCELLED">Cancelled</option>
                  </select>

                  <small className="admin-form-help">
                    Scheduled and completed states are determined automatically
                    from the campaign dates.
                  </small>
                </div>

                <div className="admin-modal-footer">
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() => setShowCampaignModal(false)}
                    disabled={campaignSaving}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="admin-primary-button"
                    disabled={campaignSaving}
                  >
                    {campaignSaving
                      ? "Saving..."
                      : editingCampaign
                        ? "Update Campaign"
                        : "Create Campaign"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  /* =====================================================
     RENDER EVENTS
  ===================================================== */

  const renderEvents = () => {
    const now = new Date();

    return (
      <div className="admin-content-section">
        <div className="admin-section-toolbar">
          <div>
            <h2>Events</h2>

            <p>Create and manage events visible to users and volunteers.</p>
          </div>

          <button
            type="button"
            className="admin-primary-button"
            onClick={openCreateEventModal}
          >
            <Plus size={18} />
            Add Event
          </button>
        </div>

        <div className="admin-panel">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Location</th>
                  <th>Schedule</th>
                  <th>Capacity</th>
                  <th>Registrations</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {events.length ? (
                  events.map((event) => {
                    const displayStatus = getEventStatus(event, now);

                    const registrationCount = event._count?.registrations || 0;

                    const hasCapacity =
                      event.capacity !== null && event.capacity !== undefined;

                    const isFull =
                      hasCapacity &&
                      registrationCount >= Number(event.capacity);

                    return (
                      <tr key={event.id}>
                        <td>
                          <strong>{event.title}</strong>

                          {event.description && (
                            <div className="admin-event-description">
                              {event.description}
                            </div>
                          )}
                        </td>

                        <td>
                          {event.location || event.city || "—"}

                          {(event.city || event.state) && (
                            <small>
                              {event.city || ""}
                              {event.city && event.state ? ", " : ""}
                              {event.state || ""}
                            </small>
                          )}
                        </td>

                        <td>
                          <div className="admin-event-schedule">
                            <strong>{formatDateTime(event.startDate)}</strong>

                            {event.endDate && (
                              <small>to {formatDateTime(event.endDate)}</small>
                            )}
                          </div>
                        </td>

                        <td>{hasCapacity ? event.capacity : "Unlimited"}</td>

                        <td>
                          <strong>{registrationCount}</strong>

                          {hasCapacity && <small> / {event.capacity}</small>}

                          {isFull && (
                            <span className="admin-event-full">Full</span>
                          )}
                        </td>

                        <td>
                          <span
                            className={`admin-status admin-status-${displayStatus.toLowerCase()}`}
                          >
                            {displayStatus}
                          </span>
                        </td>

                        <td>
                          <div className="admin-event-actions">
                            <button
                              type="button"
                              className="admin-icon-button"
                              title="Edit event"
                              onClick={() => openEditEventModal(event)}
                            >
                              <Edit size={16} />
                            </button>

                            {displayStatus !== "COMPLETED" &&
                              displayStatus !== "CANCELLED" && (
                                <button
                                  type="button"
                                  className="admin-icon-button admin-danger-button"
                                  title="Cancel event"
                                  onClick={() => handleCancelEvent(event)}
                                >
                                  <XCircle size={16} />
                                </button>
                              )}

                            <button
                              type="button"
                              className="admin-icon-button admin-danger-button"
                              title="Delete event"
                              onClick={() => handleDeleteEvent(event)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="admin-empty">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showEventModal && (
          <div className="admin-modal-backdrop">
            <div className="admin-modal admin-event-modal">
              <div className="admin-modal-header">
                <div>
                  <span>EVENT MANAGEMENT</span>

                  <h2>{editingEvent ? "Edit Event" : "Add Event"}</h2>

                  <p>
                    {editingEvent
                      ? "Update the event details."
                      : "Create a new volunteer event."}
                  </p>
                </div>

                <button
                  type="button"
                  className="admin-modal-close"
                  onClick={() => setShowEventModal(false)}
                  disabled={eventSaving}
                >
                  <X size={20} />
                </button>
              </div>

              <form className="admin-event-form" onSubmit={handleSaveEvent}>
                <div className="admin-form-group">
                  <label>Event Title *</label>

                  <input
                    type="text"
                    name="title"
                    value={eventForm.title}
                    onChange={handleEventFormChange}
                    placeholder="e.g. Community Food Distribution"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Description</label>

                  <textarea
                    name="description"
                    value={eventForm.description}
                    onChange={handleEventFormChange}
                    placeholder="Describe the event..."
                    rows="4"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Event Image URL</label>

                  <input
                    type="url"
                    name="image"
                    value={eventForm.image}
                    onChange={handleEventFormChange}
                    placeholder="https://example.com/event-image.jpg"
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Location</label>

                    <input
                      type="text"
                      name="location"
                      value={eventForm.location}
                      onChange={handleEventFormChange}
                      placeholder="Venue / address"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>City</label>

                    <input
                      type="text"
                      name="city"
                      value={eventForm.city}
                      onChange={handleEventFormChange}
                      placeholder="City"
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>State</label>

                    <input
                      type="text"
                      name="state"
                      value={eventForm.state}
                      onChange={handleEventFormChange}
                      placeholder="State"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Capacity</label>

                    <input
                      type="number"
                      name="capacity"
                      value={eventForm.capacity}
                      onChange={handleEventFormChange}
                      min="1"
                      step="1"
                      placeholder="Leave empty for unlimited"
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Start Date & Time *</label>

                    <input
                      type="datetime-local"
                      name="startDate"
                      value={eventForm.startDate}
                      onChange={handleEventFormChange}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>End Date & Time *</label>

                    <input
                      type="datetime-local"
                      name="endDate"
                      value={eventForm.endDate}
                      onChange={handleEventFormChange}
                      required
                    />

                    <small className="admin-form-help">
                      The event automatically becomes COMPLETED after this time.
                    </small>
                  </div>
                </div>

                <div className="admin-event-status-info">
                  <span>Automatic Status</span>

                  <strong>
                    {editingEvent ? getEventStatus(editingEvent) : "UPCOMING"}
                  </strong>

                  <p>
                    Event status is determined automatically from its start and
                    end date/time. Only cancellation is manually controlled.
                  </p>
                </div>

                <div className="admin-modal-footer">
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() => setShowEventModal(false)}
                    disabled={eventSaving}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="admin-primary-button"
                    disabled={eventSaving}
                  >
                    {eventSaving
                      ? "Saving..."
                      : editingEvent
                        ? "Update Event"
                        : "Create Event"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  /* =====================================================
     RENDER TASKS
  ===================================================== */

  const renderTasks = () => {
    return (
      <div className="admin-content-section">
        <div className="admin-section-toolbar">
          <div>
            <h2>Tasks</h2>

            <p>Create and manage tasks for volunteers.</p>
          </div>

          <button
            type="button"
            className="admin-primary-button"
            onClick={openCreateTaskModal}
          >
            <Plus size={18} />
            Add Task
          </button>
        </div>

        <div className="admin-panel">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Event</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {tasks.length ? (
                  tasks.map((task) => (
                    <tr key={task.id}>
                      {/* TASK */}

                      <td>
                        <strong>{task.title}</strong>

                        {task.description && <small>{task.description}</small>}
                      </td>

                      {/* EVENT */}

                      <td>{task.event?.title || "No event"}</td>

                      {/* DUE DATE */}

                      <td>
                        {task.dueDate
                          ? formatDateTime(task.dueDate)
                          : "No due date"}
                      </td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={`admin-status admin-status-${task.status.toLowerCase()}`}
                        >
                          {task.status}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td>
                        <div className="admin-event-actions">
                          <button
                            type="button"
                            className="admin-icon-button"
                            title="Edit task"
                            onClick={() => openEditTaskModal(task)}
                          >
                            <Edit size={16} />
                          </button>

                          <button
                            type="button"
                            className="admin-icon-button admin-danger-button"
                            title="Delete task"
                            onClick={() => handleDeleteTask(task)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="admin-empty">
                      No tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* TASK MODAL */}

        {showTaskModal && (
          <div className="admin-modal-backdrop">
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              {/* MODAL HEADER */}

              <div className="admin-modal-header">
                <div>
                  <span>TASK MANAGEMENT</span>

                  <h2>{editingTask ? "Edit Task" : "Create Task"}</h2>

                  <p>Create a task for volunteers.</p>
                </div>

                <button
                  type="button"
                  className="admin-modal-close"
                  onClick={() => setShowTaskModal(false)}
                  disabled={taskSaving}
                >
                  <X size={20} />
                </button>
              </div>

              {/* TASK FORM */}

              <form className="admin-event-form" onSubmit={handleSaveTask}>
                {/* TITLE */}

                <div className="admin-form-group">
                  <label>Task Title *</label>

                  <input
                    type="text"
                    name="title"
                    value={taskForm.title}
                    onChange={handleTaskFormChange}
                    placeholder="e.g. Food Distribution Support"
                    required
                  />
                </div>

                {/* DESCRIPTION */}

                <div className="admin-form-group">
                  <label>Description</label>

                  <textarea
                    name="description"
                    value={taskForm.description}
                    onChange={handleTaskFormChange}
                    placeholder="Describe the task..."
                    rows="4"
                  />
                </div>

                {/* EVENT */}

                <div className="admin-form-group">
                  <label>Event</label>

                  <select
                    name="eventId"
                    value={taskForm.eventId}
                    onChange={handleTaskFormChange}
                  >
                    <option value="">No Event</option>

                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* DUE DATE */}

                <div className="admin-form-group">
                  <label>Due Date & Time</label>

                  <input
                    type="datetime-local"
                    name="dueDate"
                    value={taskForm.dueDate}
                    onChange={handleTaskFormChange}
                  />
                </div>

                {/* STATUS */}

                <div className="admin-form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={taskForm.status}
                    onChange={handleTaskFormChange}
                  >
                    <option value="TODO">Pending</option>

                    <option value="IN_PROGRESS">In Progress</option>

                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>

                {/* FOOTER */}

                <div className="admin-modal-footer">
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() => setShowTaskModal(false)}
                    disabled={taskSaving}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="admin-primary-button"
                    disabled={taskSaving}
                  >
                    {taskSaving
                      ? "Saving..."
                      : editingTask
                        ? "Update Task"
                        : "Create Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  /* =====================================================
     RENDER COMMUNITIES
  ===================================================== */

  const renderCommunities = () => {
    const activeCount = communities.filter(
      (community) => community.isActive === true,
    ).length;

    const totalMembers = communities.reduce(
      (total, community) => total + Number(community._count?.members || 0),
      0,
    );

    const searchTerm = communitySearch.trim().toLowerCase();

    const filteredCommunities = communities.filter((community) => {
      const matchesSearch =
        !searchTerm ||
        community.name?.toLowerCase().includes(searchTerm) ||
        community.description?.toLowerCase().includes(searchTerm) ||
        community.city?.toLowerCase().includes(searchTerm) ||
        community.state?.toLowerCase().includes(searchTerm) ||
        community.country?.toLowerCase().includes(searchTerm);

      const matchesStatus =
        communityStatusFilter === "ALL" ||
        (communityStatusFilter === "ACTIVE" && community.isActive === true) ||
        (communityStatusFilter === "INACTIVE" && community.isActive !== true);

      const matchesVisibility =
        communityVisibilityFilter === "ALL" ||
        (communityVisibilityFilter === "PUBLIC" &&
          community.isPublic === true) ||
        (communityVisibilityFilter === "PRIVATE" &&
          community.isPublic !== true);

      return matchesSearch && matchesStatus && matchesVisibility;
    });

    return (
      <>
        <div className="admin-content-section">
          <div className="admin-section-toolbar">
            <div>
              <h2>Communities</h2>

              <p>Create, monitor and manage NGO communities and members.</p>
            </div>

            <button
              className="admin-primary-button"
              onClick={openCreateCommunity}
            >
              <Plus size={17} />
              New Community
            </button>
          </div>

          {/* COMMUNITY STATISTICS */}
          <div className="admin-stat-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <UsersRound size={22} />
              </div>

              <div>
                <span>Total Communities</span>
                <strong>{communities.length}</strong>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <CheckCircle size={22} />
              </div>

              <div>
                <span>Active</span>
                <strong>{activeCount}</strong>
              </div>
            </div>

            <div className="admin-stat-card admin-stat-warning">
              <div className="admin-stat-icon">
                <Ban size={22} />
              </div>

              <div>
                <span>Inactive</span>
                <strong>{communities.length - activeCount}</strong>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <Users size={22} />
              </div>

              <div>
                <span>Total Members</span>
                <strong>{totalMembers}</strong>
              </div>
            </div>
          </div>

          {/* SEARCH / FILTERS */}
          <div className="admin-panel">
            <div className="admin-toolbar-actions">
              <input
                className="admin-search"
                type="text"
                placeholder="Search by name, description or city..."
                value={communitySearch}
                onChange={(e) => setCommunitySearch(e.target.value)}
              />

              <select
                className="admin-filter"
                value={communityStatusFilter}
                onChange={(e) => setCommunityStatusFilter(e.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>

              <select
                className="admin-filter"
                value={communityVisibilityFilter}
                onChange={(e) => setCommunityVisibilityFilter(e.target.value)}
              >
                <option value="ALL">Public + Private</option>
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private</option>
              </select>
            </div>
          </div>

          {/* COMMUNITY CARDS */}
          <div className="admin-card-grid">
            {filteredCommunities.map((community) => (
              <div className="admin-management-card" key={community.id}>
                <div className="admin-management-card-top">
                  <span
                    className={
                      community.isActive
                        ? "admin-status admin-status-active"
                        : "admin-status admin-status-inactive"
                    }
                  >
                    {community.isActive ? "ACTIVE" : "INACTIVE"}
                  </span>

                  <span className="admin-role">
                    {community.isPublic ? "PUBLIC" : "PRIVATE"}
                  </span>

                  <span>#{community.id}</span>
                </div>

                <h3>{community.name}</h3>

                <p>{community.description || "No description."}</p>

                <div className="admin-management-meta">
                  <span>
                    {[community.city, community.state, community.country]
                      .filter(Boolean)
                      .join(", ") || "No location"}
                  </span>

                  <span>Members: {community._count?.members || 0}</span>
                </div>

                <div className="admin-management-meta">
                  <span>By: {community.createdBy?.name || "Unknown"}</span>

                  <span>{formatDate(community.createdAt)}</span>
                </div>

                <div className="admin-management-actions">
                  <button
                    className="admin-icon-button"
                    title="View details and members"
                    onClick={() => viewCommunity(community)}
                  >
                    <Eye size={17} />
                  </button>

                  <button
                    className="admin-icon-button"
                    title="Edit community"
                    onClick={() => openEditCommunity(community)}
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    className="admin-icon-button"
                    title={community.isActive ? "Deactivate" : "Activate"}
                    onClick={() => toggleCommunityStatus(community)}
                  >
                    {community.isActive ? (
                      <Ban size={17} />
                    ) : (
                      <UserCheck size={17} />
                    )}
                  </button>

                  <button
                    className="admin-icon-button admin-icon-danger"
                    title="Delete community"
                    onClick={() => deleteCommunity(community)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {!filteredCommunities.length && (
            <div className="admin-empty-card">
              {communities.length
                ? "No communities match your search."
                : "No communities found. Create the first one."}
            </div>
          )}
        </div>

        {/* COMMUNITY DETAILS MODAL */}
        {selectedCommunity && (
          <div
            className="admin-modal-backdrop"
            onClick={() => setSelectedCommunity(null)}
          >
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <div>
                  <span>COMMUNITY DETAILS</span>

                  <h2>{selectedCommunity.name}</h2>
                </div>

                <button
                  className="admin-modal-close"
                  onClick={() => setSelectedCommunity(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="admin-modal-body">
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span>Status</span>

                    <strong>
                      {selectedCommunity.isActive ? "ACTIVE" : "INACTIVE"}
                    </strong>
                  </div>

                  <div className="admin-detail-item">
                    <span>Visibility</span>

                    <strong>
                      {selectedCommunity.isPublic ? "PUBLIC" : "PRIVATE"}
                    </strong>
                  </div>

                  <div className="admin-detail-item">
                    <span>Location</span>

                    <strong>
                      {[
                        selectedCommunity.city,
                        selectedCommunity.state,
                        selectedCommunity.country,
                      ]
                        .filter(Boolean)
                        .join(", ") || "Not specified"}
                    </strong>
                  </div>

                  <div className="admin-detail-item">
                    <span>Created By</span>

                    <strong>
                      {selectedCommunity.createdBy?.name || "Unknown"}
                    </strong>
                  </div>

                  <div className="admin-detail-item">
                    <span>Created</span>

                    <strong>{formatDate(selectedCommunity.createdAt)}</strong>
                  </div>

                  <div className="admin-detail-item">
                    <span>Members</span>

                    <strong>
                      {selectedCommunity._count?.members ??
                        selectedCommunity.members?.length ??
                        0}
                    </strong>
                  </div>
                </div>

                {selectedCommunity.description && (
                  <div className="admin-detail-long">
                    <span>Description</span>

                    <p>{selectedCommunity.description}</p>
                  </div>
                )}

                <div className="admin-panel" style={{ marginTop: "16px" }}>
                  <div className="admin-panel-header">
                    <div>
                      <h3>
                        Members ({selectedCommunity.members?.length || 0})
                      </h3>

                      <p>Manage roles, status or remove members.</p>
                    </div>
                  </div>

                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Member</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Joined</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {selectedCommunity.members?.length ? (
                          selectedCommunity.members.map((member) => (
                            <tr key={member.id}>
                              <td>
                                <div className="admin-user-cell">
                                  <strong>
                                    {member.user?.name || "Unknown"}
                                  </strong>

                                  <small>{member.user?.email}</small>
                                </div>
                              </td>

                              <td>
                                <select
                                  className="admin-small-select"
                                  value={member.role}
                                  onChange={(e) =>
                                    changeMemberField(
                                      member,
                                      "role",
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="MEMBER">Member</option>
                                  <option value="MODERATOR">Moderator</option>
                                  <option value="ADMIN">Admin</option>
                                </select>
                              </td>

                              <td>
                                <select
                                  className="admin-small-select"
                                  value={member.status}
                                  onChange={(e) =>
                                    changeMemberField(
                                      member,
                                      "status",
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="ACTIVE">Active</option>
                                  <option value="INACTIVE">Inactive</option>
                                  <option value="BANNED">Banned</option>
                                </select>
                              </td>

                              <td>{formatDate(member.joinedAt)}</td>

                              <td>
                                <button
                                  className="admin-icon-button admin-icon-danger"
                                  title="Remove member"
                                  onClick={() => removeMember(member)}
                                >
                                  <Trash2 size={17} />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="admin-empty">
                              No members yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="admin-modal-actions">
                <button
                  className="admin-danger-button"
                  onClick={() => toggleCommunityStatus(selectedCommunity)}
                >
                  {selectedCommunity.isActive ? (
                    <>
                      <Ban size={17} />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <UserCheck size={17} />
                      Activate
                    </>
                  )}
                </button>

                <button
                  className="admin-success-button"
                  onClick={() => {
                    setSelectedCommunity(null);
                    openEditCommunity(selectedCommunity);
                  }}
                >
                  <Pencil size={17} />
                  Edit Community
                </button>
              </div>
            </div>
          </div>
        )}

        {/* COMMUNITY CREATE / EDIT MODAL */}
        {communityModal && (
          <div
            className="admin-modal-backdrop"
            onClick={() => setCommunityModal(null)}
          >
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <div>
                  <span>
                    {communityModal.mode === "create"
                      ? "NEW COMMUNITY"
                      : "EDIT COMMUNITY"}
                  </span>

                  <h2>
                    {communityModal.mode === "create"
                      ? "Create Community"
                      : "Update Community"}
                  </h2>
                </div>

                <button
                  className="admin-modal-close"
                  onClick={() => setCommunityModal(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="admin-modal-body">
                <div className="admin-form-grid">
                  <div className="admin-form-group admin-form-full">
                    <label htmlFor="community-name">Name *</label>

                    <input
                      id="community-name"
                      type="text"
                      placeholder="e.g. Mumbai Food Seva Circle"
                      value={communityForm.name}
                      onChange={(e) =>
                        setCommunityForm({
                          ...communityForm,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="admin-form-group admin-form-full">
                    <label htmlFor="community-description">Description</label>

                    <textarea
                      id="community-description"
                      rows="3"
                      placeholder="What is this community about?"
                      value={communityForm.description}
                      onChange={(e) =>
                        setCommunityForm({
                          ...communityForm,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="community-city">City</label>

                    <input
                      id="community-city"
                      type="text"
                      placeholder="City"
                      value={communityForm.city}
                      onChange={(e) =>
                        setCommunityForm({
                          ...communityForm,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="community-state">State</label>

                    <input
                      id="community-state"
                      type="text"
                      placeholder="State"
                      value={communityForm.state}
                      onChange={(e) =>
                        setCommunityForm({
                          ...communityForm,
                          state: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="community-country">Country</label>

                    <input
                      id="community-country"
                      type="text"
                      placeholder="Country"
                      value={communityForm.country}
                      onChange={(e) =>
                        setCommunityForm({
                          ...communityForm,
                          country: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="community-image">Image URL</label>

                    <input
                      id="community-image"
                      type="text"
                      placeholder="https://..."
                      value={communityForm.image}
                      onChange={(e) =>
                        setCommunityForm({
                          ...communityForm,
                          image: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="admin-form-group admin-checkbox-row">
                    <input
                      id="community-public"
                      type="checkbox"
                      checked={communityForm.isPublic}
                      onChange={(e) =>
                        setCommunityForm({
                          ...communityForm,
                          isPublic: e.target.checked,
                        })
                      }
                    />

                    <label htmlFor="community-public">
                      Public (anyone can discover)
                    </label>
                  </div>

                  <div className="admin-form-group admin-checkbox-row">
                    <input
                      id="community-active"
                      type="checkbox"
                      checked={communityForm.isActive}
                      onChange={(e) =>
                        setCommunityForm({
                          ...communityForm,
                          isActive: e.target.checked,
                        })
                      }
                    />

                    <label htmlFor="community-active">
                      Active (visible to members)
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-modal-actions">
                <button
                  className="admin-text-button"
                  onClick={() => setCommunityModal(null)}
                >
                  Cancel
                </button>

                <button
                  className="admin-success-button"
                  onClick={saveCommunity}
                  disabled={savingCommunity}
                >
                  <CheckCircle size={17} />

                  {savingCommunity
                    ? "Saving..."
                    : communityModal.mode === "create"
                      ? "Create Community"
                      : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  /* =====================================================
   RENDER EXPENSES
===================================================== */
  const renderExpenses = () => {
    return (
      <div className="admin-content-section">
        <div className="admin-section-toolbar">
          <div>
            <h2>Expenses</h2>
            <p>
              Record and manage how Hanumant Seva funds are used across
              campaigns.
            </p>
          </div>

          <button
            className="admin-primary-button"
            onClick={openCreateExpenseModal}
          >
            <Plus size={17} />
            Add Expense
          </button>
        </div>

        <div className="admin-panel">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Expense</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Receipt</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {expenses.length ? (
                  expenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>
                        <strong>{expense.campaign?.title || "—"}</strong>
                      </td>

                      <td>
                        <div>
                          <strong>{expense.title}</strong>

                          {expense.description && (
                            <div
                              style={{
                                fontSize: "0.82rem",
                                marginTop: "4px",
                                opacity: 0.7,
                              }}
                            >
                              {expense.description}
                            </div>
                          )}
                        </div>
                      </td>

                      <td>
                        <span className="admin-action-badge">
                          {expense.category}
                        </span>
                      </td>

                      <td>
                        <strong>{formatCurrency(expense.amount)}</strong>
                      </td>

                      <td>{formatDate(expense.expenseDate)}</td>

                      <td>
                        {expense.receiptUrl ? (
                          <a
                            href={expense.receiptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-view-site"
                          >
                            <Eye size={15} />
                            View
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>

                      <td>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        >
                          <button
                            type="button"
                            className="admin-icon-button"
                            onClick={() => openEditExpenseModal(expense)}
                            title="Edit Expense"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            className="admin-icon-button admin-danger-icon"
                            onClick={() => handleDeleteExpense(expense)}
                            title="Delete Expense"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="admin-empty">
                      No expenses have been recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* =====================================================
          EXPENSE CREATE / EDIT MODAL
      ===================================================== */}
        {showExpenseModal && (
          <div
            className="admin-modal-backdrop"
            onClick={() => {
              if (!expenseSaving) {
                setShowExpenseModal(false);
                setEditingExpense(null);
              }
            }}
          >
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <div>
                  <h2>{editingExpense ? "Edit Expense" : "Add Expense"}</h2>

                  <p>
                    {editingExpense
                      ? "Update the expense details."
                      : "Record how funds were used for a campaign."}
                  </p>
                </div>

                <button
                  type="button"
                  className="admin-modal-close"
                  onClick={() => {
                    if (!expenseSaving) {
                      setShowExpenseModal(false);
                      setEditingExpense(null);
                    }
                  }}
                  disabled={expenseSaving}
                >
                  <X size={20} />
                </button>
              </div>

              <form className="admin-modal-body" onSubmit={handleSaveExpense}>
                <div className="admin-detail-grid">
                  {/* CAMPAIGN */}
                  <div className="admin-form-group">
                    <label htmlFor="expense-campaign">Campaign *</label>

                    <select
                      id="expense-campaign"
                      name="campaignId"
                      value={expenseForm.campaignId}
                      onChange={handleExpenseFormChange}
                      disabled={expenseSaving}
                      required
                    >
                      <option value="">Select Campaign</option>

                      {campaigns.map((campaign) => (
                        <option key={campaign.id} value={campaign.id}>
                          {campaign.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* TITLE */}
                  <div className="admin-form-group">
                    <label htmlFor="expense-title">Expense Title *</label>

                    <input
                      id="expense-title"
                      type="text"
                      name="title"
                      value={expenseForm.title}
                      onChange={handleExpenseFormChange}
                      placeholder="e.g. Food distribution supplies"
                      disabled={expenseSaving}
                      required
                    />
                  </div>

                  {/* CATEGORY */}
                  <div className="admin-form-group">
                    <label htmlFor="expense-category">Category *</label>

                    <input
                      id="expense-category"
                      type="text"
                      name="category"
                      value={expenseForm.category}
                      onChange={handleExpenseFormChange}
                      placeholder="e.g. Food, Transport, Supplies"
                      disabled={expenseSaving}
                      required
                    />
                  </div>

                  {/* AMOUNT */}
                  <div className="admin-form-group">
                    <label htmlFor="expense-amount">Amount (₹) *</label>

                    <input
                      id="expense-amount"
                      type="number"
                      name="amount"
                      value={expenseForm.amount}
                      onChange={handleExpenseFormChange}
                      placeholder="Enter expense amount"
                      min="1"
                      step="0.01"
                      disabled={expenseSaving}
                      required
                    />
                  </div>

                  {/* DATE */}
                  <div className="admin-form-group">
                    <label htmlFor="expense-date">Expense Date *</label>

                    <input
                      id="expense-date"
                      type="datetime-local"
                      name="expenseDate"
                      value={expenseForm.expenseDate}
                      onChange={handleExpenseFormChange}
                      disabled={expenseSaving}
                      required
                    />
                  </div>

                  {/* RECEIPT URL */}
                  <div className="admin-form-group">
                    <label htmlFor="expense-receipt">Receipt URL</label>

                    <input
                      id="expense-receipt"
                      type="url"
                      name="receiptUrl"
                      value={expenseForm.receiptUrl}
                      onChange={handleExpenseFormChange}
                      placeholder="https://..."
                      disabled={expenseSaving}
                    />
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="admin-form-group">
                  <label htmlFor="expense-description">Description</label>

                  <textarea
                    id="expense-description"
                    name="description"
                    value={expenseForm.description}
                    onChange={handleExpenseFormChange}
                    placeholder="Describe how this expense was used..."
                    rows="4"
                    disabled={expenseSaving}
                  />
                </div>

                <div className="admin-modal-actions">
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() => {
                      setShowExpenseModal(false);
                      setEditingExpense(null);
                    }}
                    disabled={expenseSaving}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="admin-primary-button"
                    disabled={expenseSaving}
                  >
                    {expenseSaving
                      ? "Saving..."
                      : editingExpense
                        ? "Update Expense"
                        : "Create Expense"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
  /* =====================================================
     RENDER AUDIT LOGS
  ===================================================== */

  const renderAuditLogs = () => {
    return (
      <div className="admin-content-section">
        <div className="admin-section-toolbar">
          <div>
            <h2>Audit Logs</h2>

            <p>Security history of administrative actions.</p>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Admin</th>
                  <th>Action</th>
                  <th>Entity</th>
                  <th>Details</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {auditLogs.length ? (
                  auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.user?.name || "System"}</td>

                      <td>
                        <span className="admin-action-badge">{log.action}</span>
                      </td>

                      <td>{log.entity || "—"}</td>

                      <td>{log.details || "—"}</td>

                      <td>{formatDate(log.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="admin-empty">
                      No audit logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  /* =====================================================
     CONTENT SWITCH
  ===================================================== */

  const renderContent = () => {
    if (loading) {
      return (
        <div className="admin-loading">
          <div className="admin-spinner" />

          <p>Loading admin data...</p>
        </div>
      );
    }

    switch (activeSection) {
      case "dashboard":
        return renderDashboard();

      case "volunteers":
        return renderVolunteers();

      case "users":
        return renderUsers();

      case "donations":
        return renderDonations();

      case "expenses":
        return renderExpenses();

      case "campaigns":
        return renderCampaigns();

      case "events":
        return renderEvents();

      case "tasks":
        return renderTasks();

      case "communities":
        return renderCommunities();

      case "audit":
        return renderAuditLogs();

      default:
        return null;
    }
  };

  /* =====================================================
     MAIN ADMIN LAYOUT
  ===================================================== */

  return (
    <div
      className={`admin-dashboard ${sidebarCollapsed ? "admin-collapsed" : ""}`}
    >
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`admin-sidebar ${sidebarOpen ? "admin-sidebar-open" : ""}`}
        aria-label="Admin navigation"
      >
        {/* BRAND */}

        <div className="admin-brand">
          <div className="admin-brand-icon">
            <ShieldCheck size={22} />
          </div>

          <div className="admin-brand-text">
            <strong>Hanumant Seva</strong>

            <span>Admin Panel</span>
          </div>

          <button
            className="admin-mobile-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={21} />
          </button>
        </div>

        {/* NAVIGATION */}

        <nav className="admin-navigation">
          <span className="admin-navigation-title">MANAGEMENT</span>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`admin-nav-item ${
                  activeSection === item.id ? "admin-nav-item-active" : ""
                }`}
                onClick={() => navigateSection(item.id)}
                onMouseEnter={(e) => showNavTip(e, item.label)}
                onMouseLeave={hideNavTip}
                onFocus={(e) => showNavTip(e, item.label)}
                onBlur={hideNavTip}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                <Icon size={19} />

                <span>{item.label}</span>

                {item.id === "volunteers" &&
                  dashboard?.stats?.pendingVolunteerApplications > 0 && (
                    <b className="admin-nav-count">
                      {dashboard.stats.pendingVolunteerApplications}
                    </b>
                  )}
              </button>
            );
          })}
        </nav>

        {/* SIDEBAR FOOTER */}

        <div className="admin-sidebar-footer">
          <div className="admin-admin-profile">
            <div className="admin-avatar">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <strong>{user?.name}</strong>

              <span>Administrator</span>
            </div>
          </div>

          <button
            className="admin-logout-button"
            onClick={handleLogout}
            onMouseEnter={(e) => showNavTip(e, "Logout")}
            onMouseLeave={hideNavTip}
            onFocus={(e) => showNavTip(e, "Logout")}
            onBlur={hideNavTip}
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>

          <Link
            className="admin-view-site"
            to="/"
            onMouseEnter={(e) => showNavTip(e, "View Website")}
            onMouseLeave={hideNavTip}
            onFocus={(e) => showNavTip(e, "View Website")}
            onBlur={hideNavTip}
          >
            <Globe size={16} />
            <span>View Website</span>
          </Link>
        </div>
      </aside>

      {/* EDGE TOGGLE — the single collapse control, glides with the sidebar */}
      <button
        className="admin-edge-toggle"
        onClick={() => setSidebarCollapsed((prev) => !prev)}
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!sidebarCollapsed}
        title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {sidebarCollapsed ? (
          <ChevronRight size={14} />
        ) : (
          <ChevronLeft size={14} />
        )}
      </button>

      {/* MAIN */}
      <main className="admin-main">
        {/* TOPBAR */}

        <header className="admin-topbar">
          <button
            className="admin-mobile-menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="admin-page-heading">
            <span>ADMINISTRATION</span>

            <h1>
              {menuItems.find((item) => item.id === activeSection)?.label ||
                "Dashboard"}
            </h1>
          </div>

          <div className="admin-topbar-actions">
            <button
              className="admin-refresh-button"
              onClick={handleRefresh}
              disabled={refreshing}
              title="Refresh"
            >
              <RefreshCw size={18} className={refreshing ? "admin-spin" : ""} />
            </button>

            <div className="admin-topbar-user">
              <div className="admin-avatar">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <strong>{user?.name}</strong>

                <span>ADMIN</span>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}

        <section className="admin-page-content">{renderContent()}</section>
      </main>

      {/* VOLUNTEER APPLICATION MODAL */}
      {/* ICON-RAIL TOOLTIP (collapsed sidebar only) */}
      {sidebarCollapsed && navTip && (
        <div className="admin-nav-tooltip" style={{ top: navTip.top }}>
          {navTip.label}
        </div>
      )}

      {/* APPLICATION MODAL */}
      {/* =================================================
         VOLUNTEER APPLICATION MODAL
      ================================================= */}

      {selectedApplication && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setSelectedApplication(null)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <span>VOLUNTEER APPLICATION</span>

                <h2>{selectedApplication.user.name}</h2>
              </div>

              <button
                className="admin-modal-close"
                onClick={() => setSelectedApplication(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-detail-grid">
                <div className="admin-detail-item">
                  <span>Name</span>

                  <strong>{selectedApplication.user.name}</strong>
                </div>

                <div className="admin-detail-item">
                  <span>Email</span>

                  <strong>{selectedApplication.user.email}</strong>
                </div>

                <div className="admin-detail-item">
                  <span>Phone</span>

                  <strong>
                    {selectedApplication.user.phone || "Not provided"}
                  </strong>
                </div>

                <div className="admin-detail-item">
                  <span>Applied</span>

                  <strong>{formatDate(selectedApplication.createdAt)}</strong>
                </div>

                <div className="admin-detail-item">
                  <span>Skills</span>

                  <strong>
                    {selectedApplication.skills || "Not provided"}
                  </strong>
                </div>

                <div className="admin-detail-item">
                  <span>Preferred Area</span>

                  <strong>
                    {selectedApplication.preferredArea || "Not provided"}
                  </strong>
                </div>

                <div className="admin-detail-item">
                  <span>Availability</span>

                  <strong>
                    {selectedApplication.availability || "Not provided"}
                  </strong>
                </div>

                <div className="admin-detail-item">
                  <span>Experience</span>

                  <strong>
                    {selectedApplication.experience || "Not provided"}
                  </strong>
                </div>
              </div>

              <div className="admin-detail-long">
                <span>Motivation</span>

                <p>
                  {selectedApplication.motivation || "No motivation provided."}
                </p>
              </div>
            </div>

            {selectedApplication.status === "PENDING" && (
              <div className="admin-modal-actions">
                <button
                  className="admin-danger-button"
                  onClick={() => rejectApplication(selectedApplication)}
                >
                  <XCircle size={17} />
                  Reject
                </button>

                <button
                  className="admin-success-button"
                  onClick={() => approveApplication(selectedApplication)}
                >
                  <CheckCircle size={17} />
                  Approve Volunteer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
