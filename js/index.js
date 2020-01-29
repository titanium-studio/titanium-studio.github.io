const animatedClassName = "animated";
const ELEMENTS = document.querySelectorAll(".button");
const ELEMENTS_SPAN = [];
console.log(ELEMENTS)

ELEMENTS.forEach((element, index) => {
    let addAnimation = false;
    // On the last element in the page, add a listener to remove
    // ---> animation-class when animation ends
    if (element.classList.contains('not')) {
        g = element;
        element.addEventListener("animationend", e => {
            element.classList.remove(animatedClassName);
        });
        addAnimation = true;
    }

    // If The span element for this element does not exist in the array, add it.
    if (!ELEMENTS_SPAN[index])
        ELEMENTS_SPAN[index] = element.querySelector("span");

    element.addEventListener("mouseover", e => {
        ELEMENTS_SPAN[index].style.left = e.pageX - element.offsetLeft + "px";
        ELEMENTS_SPAN[index].style.top = e.pageY - element.offsetTop + "px";

        // Add an animation-class to animate via CSS.
        if (addAnimation) element.classList.add(animatedClassName);
    });

    element.addEventListener("mouseout", e => {
        ELEMENTS_SPAN[index].style.left = e.pageX - element.offsetLeft + "px";
        ELEMENTS_SPAN[index].style.top = e.pageY - element.offsetTop + "px";
    });
});

