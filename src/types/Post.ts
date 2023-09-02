export interface Post {
    id: string;
    agreeBy: string[];
    agreeCount: number;
    body: string;
    commentCount: number;
    createdAt: string;
    disagreeBy: string[];
    disagreeCount: number;
    editedAt?: string;
    userId: string;
}
