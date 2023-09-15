//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: string;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
}
export interface AttendeesType {
  id: string | number;
  name: string;
  photoUrl: string;
  attendees_role: string;
  count?: number;
}


export interface GroupHeaderType {
  id:string | number;
  group_name: string;
  group_image:string;
  group_description: string;
  group_location : string;
  group_user_id: number;
  created_at : Date;
  updated_at : Date;
  admin:string;
  is_member?:{};
  is_saved?:{};
}


export interface GroupDataType {
  id: string | number;
  group_name: string;
  group_image: string;
  group_description: string;
  group_location?: string;
  group_category_id?: number;
  group_user_id?: number;
  members_count?:number;
  comments_count?:number;
  created_at?: string;
  updated_at?: string;
  
}



export interface BlogDataType {
   id:number;
   blog_title:string; 
   blog_desc:string;
   group_id:number; 
   created_at:string;
   updated_at:string;
}

export interface GroupCategoryDataType {
  id: string | number;
  group_category_name: string;
  group_category_image: string;
  count:number;
  created_at?: Date;
  updated_at?: Date;

}

export interface EventCategoryDataType {
  id: string | number;
  event_category_name: string;
  event_category_image: string;
  count:number;
  created_at?: Date;
  updated_at?: Date;
}

export interface EventDataType {
  id: string | number;
  event_name: string;
  event_type: string;
  event_description?: string;
  event_lat?: string;
  event_long?: string;
  event_start_time?: Date;
  event_end_time?: Date;
  event_location?: string;
  event_free?:boolean;
  event_seats?: number;
  event_rsvp? :boolean;
  event_image?: string;
  host?: string;
  event_category_id?: number;
  event_user_id?:number;
  created_at?: Date;
  updated_at?: Date;
}



export interface PostAuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  bgImage?: string;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: string;
}

export interface PostDataType {
  id: string | number;
  author: PostAuthorType;
  date: string;
  href: string;
  categories: TaxonomyType[];
 
  title: string;
  featuredImage: string;
  desc?: string;
  like: {
    count: number;
    isLiked: boolean;
  };
  bookmark: {
    count: number;
    isBookmarked: boolean;
  };
  commentCount: number;
  memberCount: number;
  viewdCount: number;
  readingTime: number;
  postType: "standard" | "video" | "gallery" | "audio";
  videoUrl?: string;
  audioUrl?: string;
  galleryImgs?: string[];
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

export interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
}
