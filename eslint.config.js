import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);

const loadCustomers = async () => {
  const orders = await orderService.getAllOrders();
  // Extract unique customers by email
  const uniqueCustomers = Array.from(
    new Map(orders.map(order => [order.customer.email, order.customer])).values()
  );
  setCustomers(uniqueCustomers);
};

{
  activeTab === 'customers' && (
    <div className="bg-secondary rounded-lg p-6">
      <h2 className="font-display text-xl text-light mb-6">Customers</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2 font-medium text-gray-400">Name</th>
            <th className="pb-2 font-medium text-gray-400">Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.email}>
              <td className="py-2 text-light">{customer.name}</td>
              <td className="py-2 text-light">{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

<li>
  <button
    onClick={() => {
      setActiveTab('customers');
      loadCustomers();
    }}
    className={`w-full text-left px-4 py-2 rounded flex items-center ${activeTab === 'customers' ? 'bg-primary text-dark' : 'text-light hover:bg-dark'}`}
  >
    <Users size={18} className="mr-2" />
    Customers
  </button>
</li>
