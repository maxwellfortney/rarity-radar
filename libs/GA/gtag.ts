export const pageview = (url: string, title: string) => {
    (window as any).gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_location: url,
        page_title: title,
    });
};

export const event = ({ action, category, label, value }: any) => {
    (window as any).gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};
