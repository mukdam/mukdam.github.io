# Daily LinkedIn Post - Magento 2 / Adobe Commerce
**Date:** September 2, 2026  
**Topic:** Why 'Around' Plugins in Magento 2 Are Hurting Your Performance (And What to Use Instead)  
**Target Audience:** Magento Developers, Adobe Commerce Architects, Technical Leads  

---

### 📝 LinkedIn Post Content (Copy & Paste Ready)

Are you still using `around` plugins in Magento 2? You might be unknowingly degrading your store's throughput. 🛑

Here's why `around` plugins are considered an anti-pattern in high-performance Adobe Commerce stores—and what to do instead:

---

### 1️⃣ The Call Stack & Memory Overhead
Magento wraps `around` plugins in an interceptor call chain. When multiple `around` plugins attach to the same method:
- The PHP call stack depth increases significantly.
- Memory consumption jumps under high concurrency.
- Debugging stack traces becomes a nightmare when an exception is thrown midway.

### 2️⃣ Breaking the Flow & Masking Errors
If an `around` plugin fails to properly execute or return `$proceed(...$args)`, it silently suppresses the core method logic or breaks downstream plugins in the chain.

---

### 💡 What Should You Use Instead?

✅ **1. Use `before` Plugins:**
If you only need to modify input arguments or validate data before execution.

✅ **2. Use `after` Plugins:**
If you need to mutate the return result or log output without altering the core execution flow.

✅ **3. Use Events / Observers:**
If you want completely decoupled side effects (e.g., sending tracking payloads, notifications, or triggering asynchronous queue jobs).

✅ **4. Use Adobe I/O Events & App Builder (for Adobe Commerce Cloud):**
Offload heavy downstream logic entirely off the core PHP monolith to serverless workers.

---

### ⚡ Golden Rule:
Only use an `around` plugin when you **must conditionally prevent** the target method from running (e.g., custom cache interception or security gating).

Have you audited your custom modules for unnecessary `around` plugins recently? What's your team's policy on code reviews for interceptors?

Drop your thoughts below! 👇

---

#Magento #AdobeCommerce #Magento2 #WebPerformance #PHP #EcommerceDevelopment #BackendDevelopment #CleanCode #SoftwareArchitecture
