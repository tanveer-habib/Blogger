import EmailList from "@/components/Admin/EmailList.jsx";
import Loader from "@/components/Loader.jsx";
import { fetchEmail } from "@/lib/emailControllers";

const SubscriptionPage = async () => {
    const emails = await fetchEmail();
    return emails ? (
        <EmailList emails={emails} />
    ) : <Loader />
};

export default SubscriptionPage;

export const metadata = {
    title: "Blogger - Subscriptions",
    description: "Blogger - This is subscription page"
}