export default function Page() {
    return (
        <form className="space-y-3">
            <h1 className="">
                Log in to Virtual ER
            </h1>
            <div>
                <label
                    className=""
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    className=""
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                />
            </div>
            <div className="">
                <label
                    className=""
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    className=""
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={8}
                />
            </div>
            <button className="">
                Log in
            </button>
        </form >
    )
}