export interface PostRequest {
    ok:           boolean;
    totalResults: number;
    page:         number;
    size:         number;
    posts:        Post[];
}

export interface Post {
    _id?:     string;
    mensaje: string;
    imgs?:    string[];
    coords?:  string;
    usuario?: Usuario;
    created?: Date;    
}

export interface Usuario {
    _id?:    string;
    nombre?: string;
    avatar?: string;
    email?:  string;
    password?:string;    
}
