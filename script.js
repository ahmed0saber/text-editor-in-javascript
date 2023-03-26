const initApplication = () => {
    document.querySelectorAll(".formatting-btns").forEach(btn => {
        btn.addEventListener("click", function () {
            const selection = window.getSelection()
            if (selection.type != "Range" || selection.baseOffset === selection.extentOffset) {
                return
            }
            const selectionRange = selection.getRangeAt(0)
            const currentElement = selection.focusNode.firstElementChild
            const selectedText = selectionRange.extractContents()
            if (currentElement) {
                handleHeadingClasses(currentElement, this.dataset.tagName)
                if (currentElement.classList.length === 0) {
                    const fragment = document.createDocumentFragment()
                    fragment.textContent = currentElement.textContent
                    selectionRange.insertNode(fragment)
                } else {
                    selectionRange.insertNode(currentElement)
                }
            } else {
                const element = document.createElement("span")
                element.appendChild(selectedText)
                handleHeadingClasses(element, this.dataset.tagName)
                selectionRange.insertNode(element)
            }
            flattenFormattedText()
            selection.removeAllRanges()
        })
    })
}
initApplication()

const flattenFormattedText = () => {
    const allSpans = document.querySelectorAll(".custom-textarea > span, .custom-textarea div > span")
    allSpans.forEach(span => {
        const nestedSpan = span.querySelector("span")
        if (nestedSpan) {
            nestedSpan.classList.value.split(" ").forEach(singleClass => {
                handleHeadingClasses(span, singleClass)
                if (span.textContent.length > 0) {
                    span.innerHTML = span.textContent
                } else {
                    span.remove()
                }
            })
        }
    })
}

const handleHeadingClasses = (currentElement, currentClass) => {
    const headings = ["h1", "h2", "h3", "h4", "h5", "h6"]
    if (headings.includes(currentClass)) {
        headings.forEach(heading => {
            if (currentClass === heading) {
                currentElement.classList.toggle(heading)
            } else {
                currentElement.classList.remove(heading)
            }
        })
    } else {
        currentElement.classList.toggle(currentClass)
    }
}