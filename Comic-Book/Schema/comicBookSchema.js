const { z } = require('zod');

const comicBookSchema = z.object({
    bookName: z.string().nonempty("Book name is required"),
    authorName: z.string().nonempty("Author name is required"),
    yearOfPublication: z.number().min(1800).max(new Date().getFullYear(), "Invalid publication year"),
    price: z.number().min(0, "Price cannot be negative"),
    discount: z.number().min(0).max(100, "Discount must be between 0 and 100"),
    numberOfPages: z.number().min(1, "Number of pages must be at least 1"),
    condition: z.enum(['new', 'used', 'damaged']).optional(),
    description: z.string().nonempty("Description is required"),
});

module.exports = { comicBookSchema };