import { createContext } from "react";

interface IBlogFilter {
	filters: string[];
}
const BlogFilterContext = createContext<IBlogFilter>({ filters: [""] });
