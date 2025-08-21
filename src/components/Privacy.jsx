const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy for Renewly</h1>
      <p className="mb-2 text-sm text-gray-500">
        Effective Date: 15 August 2025
      </p>
      <p className="mb-6">
        We value your privacy. This app is designed to store all data completely
        on device, and we do not collect, store, or share your personal data.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Key Points</h2>
      <ul className="space-y-6 list list-inside">
        <li>
          <h3 className="font-semibold text-lg">✅ No Data Collection</h3>
          <p>
            We do not collect or process any personal or sensitive data. All
            information you enter (such as subscription details, notes, or
            reminders) is stored only on your device.
          </p>
        </li>
        <li>
          <h3 className="font-semibold text-lg">✅ No Account Required</h3>
          <p>
            You do not need to sign up or create an account to use the app. We
            do not use cloud storage or servers.
          </p>
        </li>
        <li>
          <h3 className="font-semibold text-lg">✅ No Third-Party Sharing</h3>
          <p>
            Your data is not shared with third-party services, advertisers, or
            analytics providers. The app does not use tracking tools.
          </p>
        </li>
        <li>
          <h3 className="font-semibold text-lg">✅ Data Security</h3>
          <p>
            Since all information is stored locally on your device, your data’s
            security depends on your device settings. We recommend using a
            passcode, fingerprint, or face ID for extra protection.
          </p>
        </li>
        <li>
          <h3 className="font-semibold text-lg">✅ Children’s Privacy</h3>
          <p>
            The app does not knowingly collect any information from children.
            Since no data is collected, there is no risk of children’s data
            being shared.
          </p>
        </li>
        <li>
          <h3 className="font-semibold text-lg">✅ Policy Updates</h3>
          <p>
            If we make changes, the updated policy will be available in the app
            and on our Play Store listing.
          </p>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, you can contact us
        at:
      </p>
      <a
        href="mailto:code.workers2@gmail.com"
        className="text-blue-600 hover:underline"
      >
        code.workers2@gmail.com
      </a>
    </div>
  );
};

export default Privacy;
