const blockedScrollStyles = {
    overflow: "hidden",
    paddingRight: "0px",
    height: "100%"
}

const activeScrollStyles = {
    overflow: "visible",
    paddingRight: "auto",
    height: "auto"
}

function switchScroll (isActive) {
    const root = document.getElementById("_root");
    const styles = isActive
        ? activeScrollStyles
        : blockedScrollStyles;

    root.style.overflow = styles.overflow;
    root.style.paddingRight = styles.paddingRight;
    root.style.height = styles.height;
}

export default switchScroll;