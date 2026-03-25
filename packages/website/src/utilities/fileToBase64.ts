export function fileToBase64(parameters: { file: File }) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(parameters.file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
    })
}
