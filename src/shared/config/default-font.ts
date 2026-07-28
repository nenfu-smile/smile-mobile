import { createElement } from "react";
import { Text, TextInput } from "react-native";

export const DEFAULT_FONT_FAMILY = "Circular-Medium";

/**
 * RN has no CSS-style "body font" — a style prop passed explicitly to Text/TextInput
 * replaces defaultProps.style entirely rather than merging with it. Patching render()
 * instead layers the default font underneath whatever style each component passes,
 * so every Text/TextInput in the app (including third-party ones) uses it unless a
 * style explicitly sets its own fontFamily.
 */
function applyDefaultFont(Component: typeof Text | typeof TextInput) {
  const originalRender = (Component as any).render;
  (Component as any).render = function (...args: unknown[]) {
    const origin = originalRender.apply(this, args);
    return createElement(origin.type, {
      ...origin.props,
      style: [{ fontFamily: DEFAULT_FONT_FAMILY }, origin.props.style],
      ref: origin.ref,
    });
  };
}

applyDefaultFont(Text);
applyDefaultFont(TextInput);
