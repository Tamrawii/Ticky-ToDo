import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },

  todoItem: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    backgroundColor: "#fff",
  },

  doneContainer: {
    opacity: 0.5,
  },

  actionContainer: {
    flexDirection: "row",
    gap: 12,
  },

  actionButton: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    borderRadius: 100,
  },

  swipeWrapper: {
    borderRadius: 16,
    overflow: "hidden",
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#000",
    letterSpacing: -1.05,
    marginBottom: 12,
  },

  bodyText: {
    fontSize: 17,
  },

  deletedTask: {
    fontSize: 17,
    textDecorationLine: "line-through",
    color: "#888",
  },

  checkbox: {
    height: 24,
    width: 24,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#000",
  },

  checkboxChecked: {
    height: 24,
    width: 24,
    borderRadius: 100,
    backgroundColor: "#888",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#000",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  bottomSheet: {
    padding: 20,
  },

  rightActionContainer: {
    flexDirection: "row",
    width: 160,
    height: "100%",
  },

  updateButton: {
    backgroundColor: "#007AFF",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  actionText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
});
