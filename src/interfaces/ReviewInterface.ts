type author_details = {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
}
export interface ReviewInterface {
    author: string;
    author_details: author_details;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
}
