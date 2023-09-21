export type User = {
    id: string;
    name: string;
    email: string;
    password?: string;
};

export type Recipe = {
    id: string;
    title: string;
    dateCreated: string;
    authorId: string;
    instructions: string[];
    tags: string[];
};

export type NewRecipe = Omit<Recipe, 'id'>;

export type LoginForm = {
    email: string;
    password: string;
};

export type RegisterForm = {
    name: string;
    confirmPassword: string;
} & LoginForm;
