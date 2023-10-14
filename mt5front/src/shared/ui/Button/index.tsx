import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import { COLORS } from "../../constants";
export interface ButtonProps extends PressableProps {
  type?: "secondary" | "primary";
  title?: string;
}

export const Button = ({
  title = "Button",
  type = "primary",
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      {...props}
      style={StyleSheet.flatten([
        styles.container,
        type === "primary" && styles.primary,
        type === "secondary" && styles.secondary,
        props.disabled && styles.disabled,
        props.style,
      ])}
    >
      <Text
        style={[
          styles.text,
          type === "primary" && styles.primaryText,
          type === "secondary" && styles.secondaryText,
          props.disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    paddingVertical: 7,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  primary: {
    backgroundColor: COLORS.primaryBlue,
  },
  primaryText: {
    color: COLORS.white,
  },
  secondary: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primaryBlue,
    borderWidth: 1,
  },
  secondaryText: {
    color: COLORS.primaryBlue,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
  },
  disabled: {
    backgroundColor: COLORS.backgroundGray,
    borderColor: COLORS.backgroundGray,
  },
  disabledText: {
    color: COLORS.white,
  },
});
