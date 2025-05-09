import { toast, Toaster } from 'sonner';

const NewsletterSubscriptionPage = () => {
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    if(!email){
      toast.error(`Plz write your email to Subscribe: `);
    }

    if (email) {
      try {
        console.log(`Subscribed with email: ${email}`);
        toast.success('Subscribed to the Newsletter Successfully!');
      } catch (error: any) {
        toast.error(`Failed to Subscribe: ${error.message}`);
      }
    }
  };
    


  return (
    <div className="mt-12 mb-12 flex h-full w-[100%] p-4">
      <Toaster richColors={true} position="top-center" />
      <div className="space-y-6 text-left text-[#007595]">
        <h1 className="text-4xl leading-tight font-extrabold tracking-tight">
          Join the Cycling Revolution
        </h1>
        <p className="mb-6 text-xl">
          Subscribe to our newsletter for exclusive offers, new arrivals, and expert tips on
          cycling. Stay ahead of the pack.
        </p>
        <div className="flex space-x-4">
          <form className="flex space-x-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              className="w-[70%] rounded-xl p-4 text-lg text-black transition duration-300 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-teal-700 px-8 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-teal-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscriptionPage;
