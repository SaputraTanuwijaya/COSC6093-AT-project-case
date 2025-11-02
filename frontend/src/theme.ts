import { createTheme, type MantineColorsTuple } from "@mantine/core";

const quantumPrimary: MantineColorsTuple = [
  "#f2e8ff",
  "#d9c8ff",
  "#b39bff",
  "#8c6fff",
  "#6742ff",
  "#5329ff",
  "#451aff",
  "#3a10eb",
  "#320cd1",
  "#2908b8",
];

export const theme = createTheme({
  /** 🔮 Core color identity */
  colors: {
    quantum: quantumPrimary,
  },
  primaryColor: "quantum",

  /** 🧩 Global radius, shadows, and font */
  defaultRadius: "md",
  fontFamily: "'Inter', 'Poppins', system-ui, sans-serif",
  headings: {
    fontFamily: "'Poppins', 'Inter', sans-serif",
    fontWeight: "700",
    sizes: {
      h1: { fontSize: "2.5rem", fontWeight: "800", lineHeight: "1.2" },
      h2: { fontSize: "2rem", fontWeight: "700", lineHeight: "1.3" },
      h3: { fontSize: "1.5rem", fontWeight: "700", lineHeight: "1.3" },
      h4: { fontSize: "1.25rem", fontWeight: "600", lineHeight: "1.4" },
    },
  },
  shadows: {
    xs: "0 1px 3px rgba(0, 0, 0, 0.08)",
    sm: "0 2px 8px rgba(0, 0, 0, 0.12)",
    md: "0 4px 16px rgba(0, 0, 0, 0.15)",
    lg: "0 8px 24px rgba(0, 0, 0, 0.2)",
    xl: "0 12px 32px rgba(0, 0, 0, 0.25)",
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },

  /** 🎨 Component-specific defaults */
  components: {
    Button: {
      defaultProps: {
        radius: "md",
        size: "md",
      },
      styles: {
        root: {
          background: "linear-gradient(90deg, #7f00ff, #1e90ff)",
          fontWeight: 600,
          fontSize: "0.95rem",
          color: "white",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "0 4px 12px rgba(127, 0, 255, 0.3)",
          border: "none",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(127, 0, 255, 0.4)",
          },
          "&:active": {
            transform: "translateY(0px)",
            boxShadow: "0 2px 8px rgba(127, 0, 255, 0.3)",
          },
        },
      },
    },

    Paper: {
      defaultProps: {
        radius: "lg",
        shadow: "md",
        withBorder: true,
      },
      styles: {
        root: {
          background: "rgba(255,255,255,0.95)",
          border: "1px solid rgba(0,0,0,0.06)",
          backdropFilter: "blur(8px)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },

    Modal: {
      defaultProps: {
        centered: true,
        radius: "xl",
        overlayProps: {
          backgroundOpacity: 0.5,
          blur: 10,
        },
        transitionProps: { transition: "pop", duration: 200 },
      },
      styles: {
        content: {
          background: "rgba(255, 255, 255, 0.98)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.16)",
          padding: "2.5rem",
        },
        title: {
          fontSize: "1.4rem",
          fontWeight: 700,
          background: "linear-gradient(90deg, #7f00ff, #1e90ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
      },
    },

    TextInput: {
      styles: {
        input: {
          background: "rgba(0, 0, 0, 0.02)",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          color: "#1a1a1a",
          transition: "all 0.2s ease",
          fontSize: "0.95rem",
          "&:focus": {
            borderColor: "#7f00ff",
            boxShadow: "0 0 0 2px rgba(127, 0, 255, 0.1)",
          },
        },
        label: {
          color: "#333",
          fontWeight: 600,
          fontSize: "0.9rem",
          marginBottom: "0.5rem",
        },
      },
    },

    PasswordInput: {
      styles: {
        input: {
          background: "rgba(0, 0, 0, 0.02)",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          color: "#1a1a1a",
          transition: "all 0.2s ease",
          fontSize: "0.95rem",
          "&:focus": {
            borderColor: "#7f00ff",
            boxShadow: "0 0 0 2px rgba(127, 0, 255, 0.1)",
          },
        },
        label: {
          color: "#333",
          fontWeight: 600,
          fontSize: "0.9rem",
          marginBottom: "0.5rem",
        },
      },
    },

    Textarea: {
      styles: {
        input: {
          background: "rgba(0, 0, 0, 0.02)",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          color: "#1a1a1a",
          transition: "all 0.2s ease",
          fontSize: "0.95rem",
          "&:focus": {
            borderColor: "#7f00ff",
            boxShadow: "0 0 0 2px rgba(127, 0, 255, 0.1)",
          },
        },
        label: {
          color: "#333",
          fontWeight: 600,
          fontSize: "0.9rem",
          marginBottom: "0.5rem",
        },
      },
    },

    NumberInput: {
      styles: {
        input: {
          background: "rgba(0, 0, 0, 0.02)",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          color: "#1a1a1a",
          transition: "all 0.2s ease",
          fontSize: "0.95rem",
          "&:focus": {
            borderColor: "#7f00ff",
            boxShadow: "0 0 0 2px rgba(127, 0, 255, 0.1)",
          },
        },
        label: {
          color: "#333",
          fontWeight: 600,
          fontSize: "0.9rem",
          marginBottom: "0.5rem",
        },
      },
    },

    Alert: {
      styles: {
        root: {
          borderRadius: "10px",
          border: "1px solid rgba(0, 0, 0, 0.08)",
        },
      },
    },

    Divider: {
      styles: {
        root: {
          borderColor: "rgba(0, 0, 0, 0.08)",
        },
      },
    },
  },

  primaryShade: 5,
});
