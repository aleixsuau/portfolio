interface IAppConfig {
  menu: IMenu;
}

interface IMenu {
  hasBackdrop: boolean;
  mode: string;
  sections: IMenuSection[];
}

interface IMenuSection {
  id: string;
  title: string;
  link: string;
  icon: string;
  background_color: string;
}

interface IWork {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  categories: IWorkCategory[];
  illustration: {
    author: string;
    link: string;
  };
}

interface IWorkCategory {
  title: string;
  icon: string;
}

interface IMessage {
  email: string;
  message: string;
}
