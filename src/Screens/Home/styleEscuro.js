import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const styleHero = StyleSheet.create({
  heroContainer: {
    width: "100%",
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },

  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(15, 0, 40, 0.75)",
  },

  content: {
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  smallText: {
    color: "#6a11f5",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 15,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 44,
  },

  highlight: {
    color: "#7c3aed",
    fontWeight: "bold",
  },

  subtitle: {
    color: "#D1D1D1",
    fontSize: 16,
    textAlign: "center",
    marginTop: 18,
    marginBottom: 35,
    lineHeight: 24,
  },

  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    gap: 15,
  },

  primaryButton: {
    backgroundColor: "#7c3aed",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  secondaryButton: {
    borderWidth: 1.5,
    borderColor: "#7c3aed",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
  },

  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  /* INSTRUTORES */
  instrutoresSection: {
    backgroundColor: "#0f172a",
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },

  instrutoresTitulo: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  instrutoresSubtitulo: {
    color: "#94a3b8",
    fontSize: 15,
    marginBottom: 30,
  },

  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: width * 0.44,
    backgroundColor: "#1e293b",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },

  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#7c3aed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    color: "#7c3aed",
    fontSize: 20,
    fontWeight: "bold",
  },

  nomeInstrutor: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  especialidade: {
    color: "#94a3b8",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },

  rating: {
    color: "#a855f7",
    fontSize: 14,
    marginBottom: 10,
  },

  statusDisponivel: {
    backgroundColor: "rgba(16,185,129,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusOcupado: {
    backgroundColor: "rgba(148,163,184,0.2)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusTextDisponivel: {
    color: "#34d399",
    fontSize: 12,
    fontWeight: "600",
  },

  statusTextOcupado: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "600",
  },

  /* TREINOS */
  treinosSection: {
    backgroundColor: "#020617",
    paddingTop: 50,
    paddingBottom: 80,
    paddingHorizontal: 20,
  },

  treinosTitulo: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  treinosSubtitulo: {
    color: "#94a3b8",
    fontSize: 15,
    marginBottom: 30,
  },

  treinosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  treinoCard: {
    width: width * 0.44,
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#1f2937",
  },

  badgeNivel: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(124,58,237,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },

  badgeText: {
    color: "#7c3aed",
    fontSize: 12,
    fontWeight: "600",
  },

  treinoTitulo: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },

  treinoDescricao: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 15,
  },

  treinoInfoRow: {
    flexDirection: "row",
    gap: 15,
  },

  infoText: {
    color: "#a855f7",
    fontSize: 13,
    fontWeight: "500",
  },
   heroContainer: {
    width: "100%",
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },

  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(15, 0, 40, 0.75)",
  },

  content: {
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  smallText: {
    color: "#6a11f5",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 15,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 44,
  },

  highlight: {
    color: "#7c3aed",
    fontWeight: "bold",
  },

  subtitle: {
    color: "#D1D1D1",
    fontSize: 16,
    textAlign: "center",
    marginTop: 18,
    marginBottom: 35,
    lineHeight: 24,
  },

  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },

  primaryButton: {
    backgroundColor: "#7c3aed",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    marginRight: 15,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  secondaryButton: {
    borderWidth: 1.5,
    borderColor: "#7c3aed",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
  },

  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  /* INSTRUTORES */
  instrutoresSection: {
    backgroundColor: "#0f172a",
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },

  instrutoresTitulo: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  instrutoresSubtitulo: {
    color: "#94a3b8",
    fontSize: 15,
    marginBottom: 30,
  },

  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: width * 0.44,
    backgroundColor: "#1e293b",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },

  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#7c3aed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    color: "#7c3aed",
    fontSize: 20,
    fontWeight: "bold",
  },

  nomeInstrutor: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  especialidade: {
    color: "#94a3b8",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },

  rating: {
    color: "#a855f7",
    fontSize: 14,
    marginBottom: 10,
  },

  statusDisponivel: {
    backgroundColor: "rgba(16,185,129,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusTextDisponivel: {
    color: "#34d399",
    fontSize: 12,
    fontWeight: "600",
  },

    /* ================= DEPOIMENTOS ================= */
  depoimentosSection: {
    backgroundColor: "#020617",
    paddingTop: 60,
    paddingBottom: 80,
    paddingHorizontal: 20,
  },

  depoimentosTitulo: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },

  depoimentosSubtitulo: {
    color: "#94a3b8",
    fontSize: 16,
    marginBottom: 40,
  },

  depoimentosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  depoimentoCard: {
    width: width * 0.85,
    minWidth: 280,
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#1f2937",
    position: "relative",
  },

  estrelas: {
    color: "#7c3aed",
    fontSize: 18,
    marginBottom: 12,
    letterSpacing: 2,
  },

  aspas: {
    position: "absolute",
    right: 18,
    top: 12,
    fontSize: 28,
    color: "#7c3aed",
    opacity: 0.5,
  },

  depoimentoTexto: {
    color: "#e5e7eb",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 25,
  },

  depoimentoFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  depoimentoNome: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  depoimentoTempo: {
    color: "#9ca3af",
    fontSize: 13,
  },
});

export default styleHero;