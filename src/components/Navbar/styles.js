import { CaretDown } from "@phosphor-icons/react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { THEME } from "../../theme";

export const NavigationMenu = styled(NavigationMenuPrimitive.Root)`
  width: 100%;
  height: 4.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${({ direction }) =>
    direction == "right" ? "flex-end" : "flex-start"};
  padding: 2rem;
  z-index: 1201;
  background-color: ${THEME.COLORS.PRIMARY};
`;

export const NavigationMenuList = styled(NavigationMenuPrimitive.List)`
  all: unset;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: ${THEME.COLORS.PRIMARY};
  border-radius: 1rem;
  list-style: none;
`;

export const NavigationMenuTrigger = styled(NavigationMenuPrimitive.Trigger)`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.2rem;
  border-radius: 0.5rem;
  font-weight: ${THEME.FONT_WEIGHT.SEMI_BOLD};
  color: ${THEME.COLORS.TEXT_WHITE};
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  outline: none;
  user-select: none;
  background-color: ${THEME.COLORS.PRIMARY};
  transition: background-color 0.5s;
  &:hover {
    background-color: ${THEME.COLORS.LIGHT_PRIMARY};
  }
  &:focus {
    position: relative;
  }
`;

export const IconNavigationMenuTrigger = styled(
  NavigationMenuPrimitive.Trigger
)`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 100%;
  font-weight: ${THEME.FONT_WEIGHT.SEMI_BOLD};
  color: ${THEME.COLORS.TEXT_WHITE};
  cursor: pointer;
  padding: 0.5rem;
  outline: none;
  user-select: none;
  background-color: ${THEME.COLORS.PRIMARY};
  transition: background-color 0.5s;
  &:hover {
    background-color: ${THEME.COLORS.LIGHT_PRIMARY};
  }
  &:focus {
    position: relative;
  }
`;

export const StyledCaretDown = styled(CaretDown)`
  position: relative;
  color: ${THEME.COLORS.BACKGROUND_100};
  top: 0.063rem;

  [data-state="open"] & {
    transform: rotate(-180deg);
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: transform 250ms ease;
  }
`;

export const ContentList = styled.ul`
  display: grid;
  padding: 0.625rem;
  margin: 0px;
  column-gap: 0.625rem;
  list-style: none;

  @media only screen and (min-width: 600px) {
    width: 37.5rem;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: column;
  }
`;

export const NavigationMenuLink = styled(NavigationMenuPrimitive.Link)`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-bottom: 0.313rem;
  font-weight: ${THEME.FONT_WEIGHT.SEMI_BOLD};
  transition: background-color 0.5s;
  &:hover {
    background-color: ${THEME.COLORS.BLUE_200};
  }
`;

export const StyledLink = styled(Link)`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  margin-bottom: ${({ isItemList }) => (isItemList ? "0.313rem" : "0")};
  font-weight: ${THEME.FONT_WEIGHT.SEMI_BOLD};
  transition: background-color 0.5s;
  color: ${({ color }) => (color ? color : "inherit")};
  &:hover {
    background-color: ${({ hover }) => hover || THEME.COLORS.BLUE_200};
  }
`;

export const NavigationMenuContent = styled(NavigationMenuPrimitive.Content)`
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  @media only screen and (min-width: 600px) {
    width: auto;
  }
  @media (prefers-reduced-motion: no-preference) {
    animationduration: 250ms;
    animationtimingfunction: ease;
  }
`;

export const StyledArrow = styled.div`
  position: relative;
  top: 70%;
  background-color: ${THEME.COLORS.BLUE_100};
  width: 0.625rem;
  height: 0.625rem;
  transform: rotate(45deg);
  border-top-left-radius: 0.125rem;
`;

export const NavigationMenuIndicator = styled(
  NavigationMenuPrimitive.Indicator
)`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 0.625rem;
  top: 100%;
  overflow: hidden;
  z-index: 1201;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    transition:
      width,
      transform 250ms ease;
    &[data-state="visible"] {
      animation: fadeIn 200ms ease;
    }
    &[data-state="hidden"] {
      animation: fadeOut 200ms ease;
    }
  }
`;

export const ViewportPosition = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 13.5rem;
  top: ${({ topDistance }) => topDistance && `${topDistance}rem`};
  ${({ direction }) => (direction === "right" ? "right: 0;" : "left: 0;")}
  perspective: 125rem;
`;

export const NavigationMenuViewport = styled(NavigationMenuPrimitive.Viewport)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.625rem;
  transform-origin: top center;
  background-color: ${THEME.COLORS.BLUE_100};
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  height: var(--radix-navigation-menu-viewport-height);
  @media only screen and (min-width: 600px) {
    width: var(--radix-navigation-menu-viewport-width);
  }

  @keyframes scaleIn {
    from {
      transform: rotateX(-30deg) scale(0.9);
      opacity: 0;
    }
    to {
      transform: rotateX(0deg) scale(1);
      opacity: 1;
    }
  }

  @keyframes scaleOut {
    from {
      transform: rotateX(0deg) scale(1);
      opacity: 1;
    }
    to {
      transform: rotateX(-10deg) scale(0.95);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    transition:
      width,
      height,
      300ms ease;
    &[data-state="open"] {
      animation: scaleIn 200ms ease;
    }
    &[data-state="closed"] {
      animation: scaleOut 200ms ease;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  position: fixed;
  z-index: 1201;
`;

export const ContainerNavBar = styled.div`
  display: flex;
  width: 100%;
  position: fixed;
  z-index: 1201;
  background-color: ${() => {
    let env = import.meta.env.VITE_ENV_NAME;
    if (env == "HOMOLOG") return THEME.COLORS.HOMOLOG;
    if (env == "DEV") return THEME.COLORS.DEV;
    if (env == "PROD") return THEME.COLORS.PROD;
  }};
`;
