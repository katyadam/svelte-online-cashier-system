import type { Product } from "$lib/interfaces/Product";

export const startDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.style.visibility = "hidden";

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
}

export const createDownloadContent = (products: Product[]) => {
    let content: string = "";
    products.forEach(
        product => {
            content += [product.name, product.price.toString(), product.currency].join(",") + "\r\n";
        }
    )

    return content;
}