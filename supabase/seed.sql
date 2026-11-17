-- HOW TO RUN THIS FILE IN SUPABASE
-- 1. Run supabase/schema.sql first so the categories and blog table exist.
-- 2. Open your Supabase project dashboard, then go to SQL Editor -> New query.
-- 3. Paste the entire contents of this file and click Run.
--
-- This seed is idempotent: blogs are matched by slug and updated in place.
-- All content is original placeholder copy for the TechHelp library.
-- Cover images are intentionally NULL; cover_image_note and inline
-- .image-placeholder blocks describe the artwork still needed.

begin;

create temp table seed_blogs (
  title text not null,
  subtitle text,
  slug text not null,
  description text not null,
  content text not null,
  category_slug text not null,
  cover_image_note text not null,
  author_name text not null,
  is_featured boolean not null default false,
  published_at timestamptz not null
) on commit drop;

-- ---------------------------------------------------------------------------
-- Windows Help
-- ---------------------------------------------------------------------------

insert into seed_blogs (
  title, subtitle, slug, description, content, category_slug,
  cover_image_note, author_name, is_featured, published_at
) values
  (
    'Fix Windows 11 Slow Startup: A Step-by-Step Guide',
    'Find what is delaying your login and cut the wait down to seconds.',
    'fix-windows-11-slow-startup',
    'Use Startup Apps, updates, and a few safe system checks to find out why Windows 11 takes so long to start—and fix it without reinstalling.',
    $content$
<p>A slow Windows 11 startup is rarely caused by one dramatic problem. More often, a handful of small delays stack up: apps that launch at sign-in, a pending update that never finishes, cloud storage scanning thousands of files, or a drive that is running out of breathing room. The good news is that you can find the biggest offenders in about fifteen minutes without reinstalling Windows or buying new hardware.</p>

<p>Work through the sections below in order. After each change, restart your PC and note whether the sign-in time improves. That way you will know which fix actually helped.</p>

<div class="image-placeholder">Screenshot mockup of Windows 11 Task Manager on the Startup apps tab, with high-impact apps such as Teams and OneDrive highlighted and the Startup impact column visible.</div>

<h2>Measure the problem first</h2>

<p>Before changing anything, time a normal restart from the moment you press Enter on the sign-in screen to the moment the desktop is usable. Write it down. A restart is more reliable than shutting down and powering on, because Windows 11 may use Fast Startup and skip part of the normal boot process.</p>

<p>Next, open Task Manager with <strong>Ctrl + Shift + Esc</strong> and select the <strong>Startup apps</strong> tab. The <strong>Startup impact</strong> column is a useful hint, but it is based on how long an app takes to launch, not how long it delays your desktop. A program marked Medium can still be the one that makes you wait.</p>

<h2>Disable unnecessary startup apps</h2>

<ol>
  <li>Open <strong>Task Manager</strong> and select <strong>Startup apps</strong>.</li>
  <li>Sort by <strong>Startup impact</strong> so High items appear first.</li>
  <li>Right-click an app you recognize and choose <strong>Disable</strong>. Do not disable audio, touchpad, security, or display drivers.</li>
  <li>Leave your password manager and antivirus enabled if you rely on them.</li>
  <li>Restart and compare the login time with your earlier measurement.</li>
</ol>

<p>Common safe candidates include chat apps, game launchers, photo sync tools, and update assistants for software you do not use every day. If something breaks, return to the same list and enable it again.</p>

<h3>Check the startup folder too</h3>

<p>Some older programs still place shortcuts in the Startup folder instead of registering with Task Manager. Press <strong>Win + R</strong>, type <code>shell:startup</code>, and review the shortcuts in the folder that opens. Move anything you do not need at sign-in to your Documents folder rather than deleting it.</p>

<h2>Install pending updates and restart properly</h2>

<p>Partially installed updates can slow every boot while Windows tries to finish the job. Open <strong>Settings &gt; Windows Update</strong>, install everything waiting, and choose <strong>Restart now</strong> rather than shutting the lid or powering off. Give the update time to complete without forcing a shutdown.</p>

<p>If updates have been failing repeatedly, run the Windows Update troubleshooter before trying anything else. Persistent failure codes usually point to a specific component that needs repair, and the troubleshooter can reset its state.</p>

<div class="image-placeholder">Screenshot mockup of Windows 11 Settings > Windows Update with the Check for updates button and a pending restart notice highlighted.</div>

<h2>Check Fast Startup and power settings</h2>

<p>Fast Startup can make a normal shutdown look like a restart while leaving drivers in an old state. Open <strong>Control Panel &gt; Hardware and Sound &gt; Power Options &gt; Choose what the power buttons do</strong> and select <strong>Change settings that are currently unavailable</strong>. If <strong>Turn on fast startup</strong> is enabled, turn it off temporarily and restart. If startup improves and shutdown still works normally, you can leave it off.</p>

<h2>Reduce background sync at sign-in</h2>

<p>OneDrive, Dropbox, and similar tools can keep the desktop busy while they check thousands of files. Open the sync app's settings and pause syncing, then restart. If startup improves, limit sync to the folders you actually need and exclude large archives or virtual machine images.</p>

<p>Also check <strong>Settings &gt; Accounts &gt; Sign-in options</strong>. Disabling optional sign-in steps such as facial recognition for a single test can help you identify whether a camera driver or Windows Hello is adding the delay.</p>

<h2>Rule out storage and hardware</h2>

<p>Open <strong>Task Manager &gt; Performance &gt; Disk</strong> during the first minute after sign-in. If the disk stays at 100 percent for a long time, the problem may be a failing drive, a nearly full system drive, or an aggressive background scanner. Keep at least 15–20 GB free on the Windows drive, run <strong>Settings &gt; System &gt; Storage &gt; Storage Sense</strong>, and check the drive's health with the manufacturer's tool if the slowdown continues.</p>

<p>An older hard drive is the most common hardware cause of a slow login. Upgrading to an SSD is a bigger change than the steps above, but it often turns a two-minute startup into twenty seconds.</p>

<h2>A quick checklist</h2>

<ul>
  <li>Disable high-impact startup apps and review <code>shell:startup</code>.</li>
  <li>Install all Windows updates and restart with <strong>Restart now</strong>.</li>
  <li>Test with Fast Startup disabled.</li>
  <li>Pause cloud sync apps and check disk usage at sign-in.</li>
  <li>Keep 15–20 GB free, and test the drive if it stays at 100 percent.</li>
</ul>

<p>If the delays continue after these checks, a repair install of Windows 11 preserves your files and replaces system components. Back up important data first, then use <strong>Settings &gt; System &gt; Recovery &gt; Reset this PC &gt; Keep my files</strong> as a last resort.</p>
$content$,
    'windows-help',
    'Screenshot mockup of Windows 11 Task Manager on the Startup apps tab, with high-impact apps such as Teams and OneDrive highlighted and the Startup impact column visible.',
    'Alex Morgan',
    true,
    timestamptz '2026-11-14 09:00:00+00'
  ),
  (
    'How to Run the Windows Update Troubleshooter',
    'A practical reset for updates that fail, stall, or keep offering the same restart.',
    'run-windows-update-troubleshooter',
    'Use the built-in Windows Update troubleshooter, then clear the update cache safely if Windows 11 still refuses to install updates.',
    $content$
<p>When Windows Update gets stuck, the same error can survive restarts, retries, and a lot of hopeful clicking. The Windows Update troubleshooter is the first tool to try because it checks common causes automatically: stopped services, damaged update files, and misconfigured settings. It will not fix every problem, but it is safe, quick, and worth running before more involved repairs.</p>

<h2>Before you start</h2>

<ul>
  <li>Connect to a reliable network. A metered connection can pause downloads without an obvious warning.</li>
  <li>Keep at least 10 GB free on the Windows drive. Updates need working space while they unpack.</li>
  <li>Save your work. The troubleshooter may restart services or ask for a reboot.</li>
  <li>Check that the date, time, and time zone are correct. Wrong system time can break certificate checks.</li>
</ul>

<div class="image-placeholder">Screenshot mockup of Windows 11 Settings > System > Troubleshoot > Other troubleshooters with the Windows Update Run button highlighted.</div>

<h2>Run the troubleshooter</h2>

<ol>
  <li>Open <strong>Settings &gt; System &gt; Troubleshoot &gt; Other troubleshooters</strong>.</li>
  <li>Find <strong>Windows Update</strong> and select <strong>Run</strong>.</li>
  <li>Choose the account you use if Windows asks, then allow the tool to check for problems.</li>
  <li>When it finishes, read the summary and apply any recommended fix.</li>
  <li>Restart the PC, then return to <strong>Windows Update</strong> and select <strong>Check for updates</strong>.</li>
</ol>

<p>If the troubleshooter says it fixed a problem, test an update immediately. Do not assume the job is done because the tool closed successfully.</p>

<h2>If the troubleshooter cannot help</h2>

<p>The next step is to reset the update components. This clears temporary files that may be corrupted, but it does not remove your personal files or installed programs. Use an administrator Command Prompt and type each block in order.</p>

<ol>
  <li>Open Start, search for <strong>Command Prompt</strong>, right-click it, and choose <strong>Run as administrator</strong>.</li>
  <li>Stop the update services with:<br><code>net stop wuauserv</code><br><code>net stop cryptSvc</code><br><code>net stop bits</code><br><code>net stop msiserver</code></li>
  <li>Rename the update cache folders:<br><code>ren C:\Windows\SoftwareDistribution SoftwareDistribution.old</code><br><code>ren C:\Windows\System32\catroot2 catroot2.old</code></li>
  <li>Start the services again:<br><code>net start wuauserv</code><br><code>net start cryptSvc</code><br><code>net start bits</code><br><code>net start msiserver</code></li>
  <li>Restart Windows and check for updates.</li>
</ol>

<div class="image-placeholder">Screenshot mockup of an administrator Command Prompt window with the Windows Update service stop and start commands visible, without any real user data.</div>

<p>If a folder cannot be renamed because it is in use, restart first and try again. Do not delete <strong>catroot2</strong> outright; renaming keeps a copy in case you need to roll back.</p>

<h2>Check the error code before going further</h2>

<p>Open <strong>Settings &gt; Windows Update &gt; Update history</strong> and note the failure code. Search that exact code along with your Windows version. Some codes point to a specific component, such as a .NET update or a driver, and installing that component manually from Microsoft Update Catalog may succeed where the automatic queue fails.</p>

<p>Also look for a pending restart that never completed. Pause updates for a week, restart twice, and then resume updates. This sounds simple, but it clears queues that are waiting on a restart Windows did not register.</p>

<h2>Run a system file check</h2>

<p>In the same administrator Command Prompt, run <code>sfc /scannow</code>. When it finishes, run <code>DISM /Online /Cleanup-Image /RestoreHealth</code>. The first command repairs protected system files; the second repairs the component store those updates depend on. Restart after both finish.</p>

<h2>When to stop and get help</h2>

<p>Do not keep forcing an update that fails at the same percentage. Repeated failures can leave the update queue in a worse state. If the troubleshooter, cache reset, and system file check all fail, note the error code, back up important files, and use <strong>Settings &gt; System &gt; Recovery</strong> to run a repair install. That process keeps your files and installed apps while replacing damaged Windows components.</p>

<p>Finally, confirm that your device is still supported by the update you are trying to install. Very old drivers or unsupported hardware can block a feature update permanently, and no amount of cache clearing will change that.</p>
$content$,
    'windows-help',
    'Screenshot mockup of Windows 11 Settings > System > Troubleshoot > Other troubleshooters with the Windows Update Run button highlighted.',
    'Priya Shah',
    false,
    timestamptz '2026-11-10 09:00:00+00'
  ),
  (
    'Fix the "No Internet, Secured" Wi-Fi Error in Windows',
    null,
    'fix-no-internet-secured-windows',
    'A Wi-Fi network can show a strong signal and still fail to reach the internet. Work through these checks to restore the connection safely.',
    $content$
<p>The “No internet, secured” message means Windows connected to the Wi-Fi network and passed its security check, but it could not reach the internet. The router, the PC's network settings, or the internet provider can all cause it. Because the label stays the same in each case, work from the cheapest and least disruptive checks upward.</p>

<h2>Confirm the problem is not the whole network</h2>

<p>Try loading a website on your phone using mobile data, then turn mobile data off and reconnect the phone to the same Wi-Fi. If the phone also fails, the router or provider is the likely cause. If the phone works normally, focus on the Windows PC.</p>

<p>Also check whether the router's internet light is red, amber, or off. A loose cable between the router and modem, or a provider outage, will look exactly like a Windows problem from the laptop's point of view.</p>

<div class="image-placeholder">Screenshot mockup of the Windows 11 Wi-Fi flyout showing a network labeled No internet, secured and the Forget button visible.</div>

<h2>Forget the network and reconnect</h2>

<ol>
  <li>Open <strong>Settings &gt; Network &amp; internet &gt; Wi-Fi &gt; Manage known networks</strong>.</li>
  <li>Select the affected network and choose <strong>Forget</strong>.</li>
  <li>Turn Wi-Fi off and back on.</li>
  <li>Select the network, enter the password again, and test a website.</li>
</ol>

<p>Re-entering the password rules out a saved profile with stale security details. If the network uses a guest portal, open a browser and complete the sign-in page; Windows may not open it automatically.</p>

<h2>Restart the adapter and the router</h2>

<p>Turn off Wi-Fi in Settings, wait ten seconds, and turn it back on. Then restart the router properly: unplug power, wait thirty seconds, plug it back in, and give it two minutes to reconnect. Restarting the router clears temporary address tables and is often enough for a single stubborn device.</p>

<p>If only this PC is affected, use <strong>Settings &gt; Network &amp; internet &gt; Advanced network settings &gt; Network reset</strong> only as a later step. It removes and reinstalls network adapters and can clear VPN or custom settings you will need to recreate.</p>

<h2>Renew the IP address and flush DNS</h2>

<p>Open <strong>Command Prompt</strong> as administrator and run these commands one at a time:</p>

<ol>
  <li><code>ipconfig /release</code></li>
  <li><code>ipconfig /renew</code></li>
  <li><code>ipconfig /flushdns</code></li>
  <li><code>netsh winsock reset</code></li>
</ol>

<p>Restart the PC after the last command. If <code>ipconfig /renew</code> reports that it cannot contact the DHCP server, the router is not handing out addresses correctly, which points back to the router rather than Windows.</p>

<div class="image-placeholder">Screenshot mockup of Command Prompt after running ipconfig /release, ipconfig /renew, and ipconfig /flushdns, with a successful renewed IPv4 address visible.</div>

<h2>Check the adapter driver</h2>

<p>Open <strong>Device Manager</strong>, expand <strong>Network adapters</strong>, right-click your Wi-Fi adapter, and choose <strong>Update driver &gt; Search automatically for drivers</strong>. If Windows says the best driver is already installed, visit the laptop manufacturer's support page and install the Wi-Fi driver for your exact model. Avoid random driver-download sites.</p>

<p>In the adapter's <strong>Properties &gt; Power Management</strong> tab, clear <strong>Allow the computer to turn off this device to save power</strong> if it is available. Power saving can cause intermittent drops on some adapters, though it rarely causes a permanent “No internet” label.</p>

<h2>Test a different DNS server</h2>

<p>If the connection works for a few seconds and then fails, DNS may be the weak link. Open <strong>Settings &gt; Network &amp; internet &gt; Wi-Fi &gt; Hardware properties</strong>, find <strong>DNS server assignment</strong>, choose <strong>Edit</strong>, and set manual IPv4 servers to <code>1.1.1.1</code> and <code>1.0.0.1</code>. Save, then disable and re-enable Wi-Fi. If the problem disappears, your previous DNS service was unreliable.</p>

<h2>When to call the provider</h2>

<p>If multiple devices fail, if the router's internet light stays off, or if the provider's status page reports an outage, stop troubleshooting the PC. Restart the modem and router once, then contact the provider with the router model and the lights you see. A problem outside your home cannot be fixed from Windows Settings.</p>
$content$,
    'windows-help',
    'Screenshot mockup of the Windows 11 Wi-Fi flyout showing a network labeled No internet, secured and the Forget button visible.',
    'Priya Shah',
    false,
    timestamptz '2026-11-06 09:00:00+00'
  ),
  (
    'How to Uninstall Stubborn Programs on Windows',
    'When Settings says it removed an app but the app is still there.',
    'uninstall-stubborn-programs-windows',
    'Use the built-in uninstaller, Safe Mode, and Windows Installer cleanup to remove programs that refuse to leave Windows 11.',
    $content$
<p>Most apps uninstall cleanly from <strong>Settings &gt; Apps &gt; Installed apps</strong>. A stubborn program is different: the uninstall button does nothing, the process fails partway through, or the app reappears after a restart. Before reaching for a registry cleaner, try the layered approach below. It removes the program while keeping the rest of Windows intact.</p>

<h2>Start with the official uninstaller</h2>

<ol>
  <li>Open <strong>Settings &gt; Apps &gt; Installed apps</strong>.</li>
  <li>Find the program and select the three-dot menu next to it.</li>
  <li>Choose <strong>Uninstall</strong> and follow the prompts.</li>
  <li>If Windows asks for confirmation, read the app name carefully before agreeing.</li>
</ol>

<div class="image-placeholder">Screenshot mockup of Windows 11 Settings > Apps > Installed apps with a program's three-dot menu open and the Uninstall option highlighted.</div>

<p>If the uninstaller launches but freezes, close it with Task Manager and try again after a restart. A pending Windows update can leave the installer service busy, so installing updates first sometimes solves the problem.</p>

<h2>Use the app's own repair or uninstall tool</h2>

<p>Some suites, especially security and creative software, include a dedicated removal tool in their installation folder. Check the Start menu folder for the app and the manufacturer's support site. Use only the vendor's official uninstaller; third-party “force uninstall” tools can delete shared files that other programs need.</p>

<p>If the app appears in <strong>Control Panel &gt; Programs &gt; Programs and Features</strong>, try uninstalling from there as well. Windows 11 Settings and the classic Programs and Features list do not always use the same registration entry.</p>

<h2>Run the uninstaller in Safe Mode</h2>

<p>Safe Mode loads Windows with a minimal set of drivers and startup programs, which prevents the app's background service from blocking its own removal.</p>

<ol>
  <li>Open <strong>Settings &gt; System &gt; Recovery</strong>.</li>
  <li>Next to <strong>Advanced startup</strong>, choose <strong>Restart now</strong>.</li>
  <li>Select <strong>Troubleshoot &gt; Advanced options &gt; Startup Settings &gt; Restart</strong>.</li>
  <li>After the restart, press <strong>4</strong> or <strong>F4</strong> for Safe Mode.</li>
  <li>Uninstall the program from Settings or Programs and Features.</li>
  <li>Restart normally when finished.</li>
</ol>

<p>If the program still will not remove, note whether the error mentions Windows Installer. That points to the next step.</p>

<h2>Use Windows Installer cleanup carefully</h2>

<p>Programs packaged as MSI installers can leave a broken registration that blocks both uninstall and reinstall. The built-in Windows Installer cleanup utility can remove that registration, but it does not delete the app's files. It is a repair tool, not a general-purpose uninstaller.</p>

<ol>
  <li>Open an administrator Command Prompt.</li>
  <li>Run <code>msiexec /unregister</code>, then <code>msiexec /regserver</code>.</li>
  <li>Try the normal uninstall again before using any cleanup utility.</li>
</ol>

<p>Only use the Microsoft Program Install and Uninstall troubleshooter if the standard uninstall fails repeatedly. Select the app from the list it provides, not “all programs,” and create a restore point first.</p>

<h2>Remove leftovers after a successful uninstall</h2>

<p>Once the app is gone from Installed apps, check these locations for folders named after the program:</p>

<ul>
  <li><code>C:\Program Files</code> and <code>C:\Program Files (x86)</code></li>
  <li><code>C:\ProgramData</code></li>
  <li>Your user folder's <code>AppData\Local</code> and <code>AppData\Roaming</code> directories</li>
</ul>

<p>Delete only folders you can confidently tie to the removed app. When in doubt, rename the folder instead of deleting it and wait a week. Installed programs usually remain in Settings after their files are removed, so use the official uninstaller first rather than deleting the program folder.</p>

<div class="image-placeholder">Screenshot mockup of Windows 11 Programs and Features with an old application selected and the Uninstall button highlighted, alongside a note that no real user data is shown.</div>

<h2>Prevent the next stubborn uninstall</h2>

<p>Create a restore point before installing large utilities, security suites, or driver bundles. If an app refuses to leave, run its official uninstaller before manually deleting anything, and avoid registry cleaners that promise to remove “all traces.” Most leftover registry keys are harmless, while deleting the wrong one can break Windows.</p>

<p>If the app came from the Microsoft Store, use <strong>Settings &gt; Apps &gt; Installed apps &gt; Advanced options &gt; Reset</strong> first, then uninstall. Store apps follow a different removal path, and resetting often clears the corruption that blocked removal.</p>
$content$,
    'software-help',
    'Screenshot mockup of Windows 11 Settings > Apps > Installed apps with a program''s three-dot menu open and the Uninstall option highlighted.',
    'Alex Morgan',
    false,
    timestamptz '2026-11-02 09:00:00+00'
  ),
  (
    'Fix Microsoft Office Activation Errors',
    null,
    'fix-microsoft-office-activation-error',
    'Work out which Office license you own, repair the installation, and clear activation problems without buying a new key.',
    $content$
<p>An Office activation error can appear even when your subscription is paid and your account is correct. The message often says the product is unlicensed, that activation failed, or that Office cannot verify your subscription. Before entering a new product key, confirm what you own and let Office repair itself.</p>

<h2>Confirm which Office product you have</h2>

<p>Microsoft 365 subscriptions, one-time purchases such as Office 2021, and workplace accounts behave differently. Open any Office app, go to <strong>File &gt; Account</strong>, and read the product name under <strong>User Information</strong> and <strong>Product Information</strong>. A Microsoft 365 Family subscription should show a subscription name; a one-time license shows the year and edition.</p>

<div class="image-placeholder">Screenshot mockup of Microsoft Word's File > Account page with the Product Information section and subscription status highlighted.</div>

<p>If the product name is wrong, you may be signed in with the wrong account or running a different edition than the one you purchased. Sign out and sign back in with the email used for the purchase. For work accounts, ask your administrator whether the license is still assigned.</p>

<h2>Check the account and subscription</h2>

<ol>
  <li>Open <strong>File &gt; Account</strong> and select <strong>Sign out</strong>.</li>
  <li>Close all Office apps.</li>
  <li>Sign back in with the correct Microsoft account.</li>
  <li>Open Word or Excel and wait a minute for the license to refresh.</li>
</ol>

<p>Then visit your Microsoft account's <strong>Services &amp; subscriptions</strong> page in a browser. Confirm that the subscription is active and that the payment method has not expired. A failed renewal can leave Office in a reduced mode while the account page still shows the product name.</p>

<h2>Repair Office</h2>

<p>A damaged installation is the most common cause of activation loops. Repairing keeps your documents and settings.</p>

<ol>
  <li>Open <strong>Settings &gt; Apps &gt; Installed apps</strong>.</li>
  <li>Find <strong>Microsoft 365</strong> or your Office edition, open the three-dot menu, and choose <strong>Modify</strong>.</li>
  <li>Select <strong>Quick Repair</strong> and let it finish.</li>
  <li>If activation still fails, run <strong>Online Repair</strong>. It takes longer but replaces more files.</li>
  <li>Restart the PC and open an Office app.</li>
</ol>

<div class="image-placeholder">Screenshot mockup of the Microsoft 365 installer window showing Quick Repair and Online Repair options.</div>

<p>Online Repair requires an internet connection and enough free disk space. Close all Office apps first, and save your work elsewhere before starting.</p>

<h2>Update Office and Windows</h2>

<p>Open an Office app and go to <strong>File &gt; Account &gt; Update Options &gt; Update Now</strong>. Then install pending Windows updates. Activation components are shared with Windows security and identity services, so an outdated build can cause verification failures.</p>

<h2>Clear the Office identity cache</h2>

<p>If you have changed accounts or passwords recently, stale sign-in data may be the problem. Close all Office apps, open <strong>Credential Manager</strong> from Start, choose <strong>Windows Credentials</strong>, and remove entries that mention MicrosoftOffice, OneDrive, or Microsoft 365. Sign in again and let Office rebuild the cache.</p>

<p>Do not delete every credential on the machine. Remove only entries clearly related to Microsoft sign-in, and note that you may need to sign in to other Microsoft services again.</p>

<h2>Understand common error codes</h2>

<p>Error <strong>0xC004C003</strong> usually means the license could not be validated, often because the wrong account or edition is active. <strong>0x80070005</strong> points to a permissions problem and may require running Office as an administrator once or repairing the installation. <strong>0xCAA70007</strong> is often a network or proxy issue; try another connection before changing the license.</p>

<p>Write down the exact code before searching. Codes that look similar can have different fixes, and many online “key” sites are scams.</p>

<h2>What not to do</h2>

<p>Do not buy a cheap product key from an unofficial marketplace to silence the error. Those keys are often revoked later, and some are tied to volume licenses that Microsoft can deactivate. If your subscription truly expired, renew it through your Microsoft account or your workplace administrator.</p>

<p>If the repair steps fail and the account page confirms an active license, contact Microsoft support with the product name, the signed-in email, and the exact error code. They can check the license server side, which is something no local repair can do.</p>
$content$,
    'software-help',
    'Screenshot mockup of a Microsoft 365 activation error dialog over Word, with the Sign in and Troubleshoot options visible.',
    'Daniel Kim',
    false,
    timestamptz '2026-10-29 09:00:00+00'
  );

insert into seed_blogs (
  title, subtitle, slug, description, content, category_slug,
  cover_image_note, author_name, is_featured, published_at
) values
  (
    '5 Free Windows Utilities Worth Installing',
    'Small tools that solve everyday problems without a subscription.',
    '5-free-windows-utilities-worth-installing',
    'Five reputable free utilities for search, window layout, archives, passwords, and media playback—and how to install them without bundleware.',
    $content$
<p>Free Windows software has a bad reputation for a reason: many installers add toolbars, change your browser, or nag you to upgrade. The five utilities below are different. They are made by recognizable developers, do one job well, and have free versions that are genuinely useful. None of them requires a subscription for the basic tasks described here.</p>

<p>Install each one from its official website or the Microsoft Store. Avoid search-result ads that look like the official site, and decline any optional offer during installation. When a free tool asks to install a “companion” application, choose the custom install option and clear the checkbox.</p>

<div class="image-placeholder">Screenshot mockup of a clean Windows 11 desktop with five utility icons arranged in a row and a caption naming each tool category.</div>

<h2>1. Microsoft PowerToys</h2>

<p>PowerToys is a collection of small utilities from Microsoft. Three modules are especially useful: <strong>FancyZones</strong> for saving window layouts, <strong>PowerRename</strong> for renaming many files at once, and <strong>Text Extractor</strong> for copying text from an image or a scanned PDF. The settings window lets you enable only the modules you need, so it does not have to become another background burden.</p>

<p>Start with FancyZones if you use a large monitor. Define two or three layouts, then hold <strong>Shift</strong> while dragging a window to snap it into a zone. It takes a few minutes to learn and saves time every day.</p>

<h2>2. Everything</h2>

<p>Windows Search is convenient but can be slow when you need a file immediately. Everything builds a lightweight index of file names and returns results as you type. It is particularly good for finding a document when you remember part of the name but not the folder.</p>

<p>Everything indexes names, not file contents. That is a feature for speed, but it means you should not expect it to find a phrase inside a PDF. Add folder filters if you want to exclude external drives or network shares from the index.</p>

<h2>3. 7-Zip</h2>

<p>7-Zip opens and creates ZIP, 7z, TAR, and many other archive formats. It integrates with the Windows right-click menu, so you can extract a downloaded archive or create a password-protected 7z file without opening a separate window. The interface is plain, but the tool is stable and free.</p>

<p>Use a long, unique password for encrypted archives and share it through a different channel than the file itself. Archive encryption protects the contents, but it cannot protect a weak password from guessing.</p>

<div class="image-placeholder">Screenshot mockup of the 7-Zip right-click menu on a downloaded ZIP file, with Extract Here and Add to archive visible.</div>

<h2>4. Bitwarden</h2>

<p>A password manager is not optional anymore. Bitwarden's free plan covers unlimited passwords, secure notes, and syncing across devices. The browser extension fills credentials, and the desktop app can unlock with Windows Hello on supported machines. The paid plan adds sharing and emergency access, but most individuals can start free.</p>

<p>When you set it up, create a strong master password you have never used elsewhere, enable two-step login, and save the recovery code offline. A password manager protects you only if you can still get into it when your phone is lost.</p>

<h2>5. VLC Media Player</h2>

<p>VLC plays almost any audio or video file without extra codec packs. It also handles damaged or partially downloaded files better than many default players, and it can play a DVD or a network stream. The interface is not beautiful, but it is dependable and does not require an account.</p>

<p>Use VLC when Windows Media Player refuses a file or when a video plays with sound but no picture. If VLC can play it, the file is probably fine and the problem is the default player or codec.</p>

<h2>Keep the list lean</h2>

<p>Five utilities are enough for most people. Every additional program adds update work and another possible source of startup delays. Before installing something new, ask whether Windows or a tool you already own can do the job. If you try a tool and do not use it after two weeks, uninstall it rather than letting it accumulate.</p>

<p>Finally, check each vendor's update setting. PowerToys and Bitwarden can update themselves; 7-Zip and Everything may need a manual check. Turn on automatic updates where available, and revisit the list every few months so you are not running an old version with a known security flaw.</p>
$content$,
    'software-help',
    'Screenshot mockup of a clean Windows 11 desktop with five utility icons arranged in a row and a caption naming each tool category.',
    'Daniel Kim',
    false,
    timestamptz '2026-10-25 09:00:00+00'
  ),
  (
    'Gmail Won’t Send Attachments? Fix It Step by Step',
    null,
    'gmail-wont-send-attachments-fix',
    'Find out whether the limit is file size, account storage, a browser extension, or the recipient server—and send the file another way.',
    $content$
<p>You write the message, attach the file, and Gmail responds with an error or leaves the attachment spinning. The cause is usually one of four things: the file is too large, your Google storage is full, a browser extension is interfering, or the recipient's mail server rejects the attachment. The message itself is rarely the problem.</p>

<h2>Check the size limit first</h2>

<p>Gmail allows attachments up to 25 MB per message when sent through the web interface. The limit includes encoding overhead, so a file that shows 24.8 MB in Windows Explorer can still be rejected. Multiple attachments count toward the same total.</p>

<ol>
  <li>Check the file's size in File Explorer.</li>
  <li>If the total is close to 25 MB, remove other attachments and try again.</li>
  <li>For larger files, upload to Google Drive and insert a link instead of an attachment.</li>
</ol>

<div class="image-placeholder">Screenshot mockup of Gmail's attachment size warning with a 25 MB limit message and the Insert files using Drive option highlighted.</div>

<p>Some corporate Google Workspace accounts have a lower limit set by the administrator. If the limit appears lower than 25 MB, check with your IT team rather than assuming your account is broken.</p>

<h2>Use Google Drive for large files</h2>

<p>In the Gmail compose window, select the Drive icon instead of the paperclip. Upload the file and choose whether to share it with anyone who has the link or only with recipients. Gmail inserts a link, and the recipient downloads from Drive.</p>

<p>Remember that a Drive link is not the same as an attachment. If the recipient needs the file offline or the link expires, they may not be able to open it. For sensitive files, share with specific email addresses and avoid “anyone with the link” unless the content is meant to be public.</p>

<h2>Rule out browser extensions and the browser itself</h2>

<p>Open Gmail in an incognito window with extensions disabled and try attaching the same file. If it works, an extension is interfering. Disable extensions one at a time to find the culprit, especially download managers, ad blockers, and security suites that scan uploads.</p>

<p>Also try a different browser. If Chrome fails but Edge works, clear Chrome's cache and cookies for Gmail, or update Chrome. A stale service worker can cause the compose window to behave unpredictably.</p>

<h2>Check storage and account status</h2>

<p>Gmail shares storage with Google Drive and Google Photos. If your account is over its quota, you may still receive mail but be unable to send attachments. Open <strong>Google One</strong> or the storage page in your Google account and check the total.</p>

<p>Delete large attachments from the Sent folder or move old files to a local drive. Emptying the Trash and Spam folders is also necessary; messages there still count toward storage until they are permanently removed.</p>

<div class="image-placeholder">Screenshot mockup of a Google account storage page showing Gmail, Drive, and Photos usage bars, with the total storage figure highlighted.</div>

<h2>Check the file type and name</h2>

<p>Gmail blocks certain executable file types for security, including .exe and some .js files, even inside ZIP archives. If you must send a blocked file, use Drive and share a link, or ask the recipient to use a secure file-transfer service approved by your organization.</p>

<p>Rename files with unusual characters or extremely long names before attaching them. A simple name such as <code>report-final.pdf</code> avoids encoding problems that can make an attachment fail silently.</p>

<h2>When the recipient's server rejects it</h2>

<p>You may receive a bounce message that mentions the recipient's server, message size, or a security filter. In that case, Gmail accepted the message but the other side refused it. Reduce the attachment size, send a link, or ask the recipient whether their mail system allows the file type.</p>

<p>If the bounce mentions an attachment filter, do not keep resending the same file. The recipient's administrator may need to allow the type, or you can use a shared drive that both organizations can access.</p>

<h2>A short checklist</h2>

<ul>
  <li>Keep the total under 25 MB, or use a Drive link.</li>
  <li>Try incognito mode and a second browser.</li>
  <li>Check Google storage across Gmail, Drive, and Photos.</li>
  <li>Avoid blocked executable types and simplify the file name.</li>
  <li>Read any bounce message for a recipient-side clue.</li>
</ul>

<p>If attachments fail in every browser and the file is small, sign out of Gmail, clear site data for Google, and sign back in. If the problem affects your whole organization, contact the Workspace administrator before changing more settings.</p>
$content$,
    'email-help',
    'Screenshot mockup of Gmail compose with the paperclip menu open and the Insert files using Drive option highlighted.',
    'Sofia Reyes',
    false,
    timestamptz '2026-10-21 09:00:00+00'
  ),
  (
    'Fix Outlook Not Syncing on Windows',
    'New mail is missing, folders are stale, or the status bar says disconnected.',
    'fix-outlook-not-syncing-windows',
    'Diagnose Outlook sync problems on Windows by checking Work Offline, the network, the Office repair tool, add-ins, and the mail profile.',
    $content$
<p>Outlook can look completely normal while failing to sync. Messages stay in the inbox on your phone but not on the PC, sent items do not appear, or the status bar quietly says <strong>Disconnected</strong>. Before deleting the account, check the simple states that Outlook hides in plain sight.</p>

<h2>Check Work Offline and the account state</h2>

<ol>
  <li>Open Outlook and select the <strong>Send / Receive</strong> tab.</li>
  <li>Make sure <strong>Work Offline</strong> is not highlighted. If it is, click it once to turn it off.</li>
  <li>Look at the status bar at the bottom. It should say <strong>Connected</strong> or <strong>Connected to Microsoft Exchange</strong>.</li>
  <li>Select <strong>Send / Receive All Folders</strong> and wait a minute.</li>
</ol>

<div class="image-placeholder">Screenshot mockup of Outlook on Windows with the Send / Receive tab open, Work Offline visible, and the connection status in the bottom status bar highlighted.</div>

<p>If the status bar says <strong>Disconnected</strong>, hover over it. Outlook often shows a specific reason such as “Trying to connect” or a password prompt. A small padlock or warning icon can indicate that the account needs to be reauthenticated.</p>

<h2>Test the underlying connection</h2>

<p>Open a browser and load a website, then open Outlook on the web with the same account. If the browser works but desktop Outlook does not, the problem is local to Outlook or the network path it uses. If neither works, fix the internet connection first.</p>

<p>If you use a VPN, disconnect it and try again. Some VPNs block the ports Outlook uses, or they route traffic through a server that the mail provider treats as suspicious. A corporate network may also require a proxy that Outlook is not configured to use.</p>

<h2>Repair Office</h2>

<p>A damaged Office installation can break sync while leaving the interface usable. Close Outlook, then open <strong>Settings &gt; Apps &gt; Installed apps</strong>, find Microsoft 365 or your Office edition, and choose <strong>Modify &gt; Quick Repair</strong>. Restart Outlook afterward.</p>

<p>If Quick Repair does not help, run <strong>Online Repair</strong>. It takes longer and needs an internet connection, but it replaces more files. Keep your mail profile in mind: Online Repair may reset some Outlook settings, so note any custom rules or signatures you rely on.</p>

<h2>Start Outlook in safe mode</h2>

<p>Press <strong>Win + R</strong>, type <code>outlook.exe /safe</code>, and press Enter. Safe mode disables add-ins. If mail syncs correctly in safe mode, an add-in is the cause.</p>

<ol>
  <li>Close Outlook.</li>
  <li>Reopen it normally and go to <strong>File &gt; Options &gt; Add-ins</strong>.</li>
  <li>At the bottom, set <strong>Manage</strong> to <strong>COM Add-ins</strong> and select <strong>Go</strong>.</li>
  <li>Clear the checkboxes for add-ins you do not need, then restart Outlook.</li>
</ol>

<p>Re-enable add-ins one at a time if you need them. CRM tools, calendar connectors, and older antivirus add-ins are common offenders.</p>

<div class="image-placeholder">Screenshot mockup of the Outlook COM Add-ins dialog with several add-ins listed and checkboxes visible, without real user data.</div>

<h2>Rebuild the Outlook profile</h2>

<p>If the account still will not sync, create a new Outlook profile. This is more disruptive than a repair, but it fixes corrupted profile data that survives reinstalls.</p>

<ol>
  <li>Open <strong>Control Panel &gt; Mail</strong>. If you do not see Mail, search for it from Start.</li>
  <li>Select <strong>Show Profiles &gt; Add</strong>.</li>
  <li>Give the new profile a name and add the same email account.</li>
  <li>Set the new profile to <strong>Always use this profile</strong>.</li>
  <li>Open Outlook and let it rebuild the local cache.</li>
</ol>

<p>For Microsoft 365 accounts, the new profile downloads a fresh copy of the mailbox. Large mailboxes can take a while. Do not delete the old profile until the new one works and you have confirmed that local-only items are not missing.</p>

<h2>Check updates and mailbox size</h2>

<p>Install pending Office and Windows updates. Microsoft fixes sync and authentication bugs through both. Also check whether the mailbox is near its provider limit; a full mailbox can stop receiving new mail while older messages still appear.</p>

<p>If only one shared folder or calendar fails, the problem may be permissions on that folder rather than Outlook itself. Ask the owner or administrator to confirm your access.</p>

<h2>When to contact support</h2>

<p>If Outlook on the web works, a new profile fails, and the account shows as connected but no mail arrives, contact your mail administrator. Provide the exact status-bar message, the account type, and whether the problem affects other devices. That information is more useful than a screenshot of an empty inbox.</p>
$content$,
    'email-help',
    'Screenshot mockup of Outlook on Windows with the Send / Receive tab open, Work Offline visible, and the connection status in the bottom status bar highlighted.',
    'Sofia Reyes',
    false,
    timestamptz '2026-10-17 09:00:00+00'
  ),
  (
    'My Email Was Hacked: Recovery Steps That Actually Matter',
    'What to do in the first hour, and what to check after the password is changed.',
    'email-account-hacked-recovery-steps',
    'Secure a compromised email account, remove attacker access, check forwarding rules, and reduce the damage to connected accounts.',
    $content$
<p>If friends are receiving strange messages from your address, your sent folder contains mail you did not write, or you cannot sign in, treat the account as compromised. Email is the recovery key for many other services, so the first hour matters more than a perfect cleanup. Work from a device you trust and, if possible, use a different network.</p>

<h2>Secure the account from a clean device</h2>

<ol>
  <li>On a device you trust, open the provider's official website directly rather than clicking a link in an email.</li>
  <li>Change the password to a new, long, unique passphrase you have never used elsewhere.</li>
  <li>If you cannot sign in, use the provider's official account recovery flow. Do not pay a “recovery service” found through an ad.</li>
  <li>Enable two-factor authentication immediately, preferably with an authenticator app or a hardware key.</li>
  <li>Update the recovery email address and phone number if the attacker changed them.</li>
</ol>

<div class="image-placeholder">Screenshot mockup of a generic account security page with Change password, Two-step verification, and Recent security activity sections highlighted.</div>

<p>Do not reuse the old password anywhere. If it was used on other sites, change those accounts too, starting with banking, shopping, and social media.</p>

<h2>Kick out active sessions</h2>

<p>Changing a password does not always sign out devices that are already logged in. Open the account's security settings and review <strong>Recent security activity</strong> or <strong>Devices</strong>. Sign out all sessions you do not recognize, then sign out everywhere and sign back in on your own devices.</p>

<p>Check connected apps and third-party access. Revoke anything you do not use, especially apps with permission to read mail, send mail, or manage contacts. Attackers often keep access through an OAuth token instead of a password.</p>

<h2>Hunt for forwarding rules and filters</h2>

<p>A common attack is to add a hidden forwarding address or a filter that moves replies into an archive folder. The account looks normal, but the attacker keeps receiving password-reset messages.</p>

<ul>
  <li>Open the mail settings and review forwarding addresses.</li>
  <li>Check filters, rules, and blocked senders for anything you did not create.</li>
  <li>Look for a “send as” alias or a changed display name.</li>
  <li>Review the signature and auto-reply for links you did not add.</li>
</ul>

<div class="image-placeholder">Screenshot mockup of an email settings page showing forwarding and filter options, with an unfamiliar forwarding address highlighted.</div>

<p>Remove anything suspicious and save the settings. Then send yourself a test message from another account and confirm it arrives normally.</p>

<h2>Tell the people who may be targeted</h2>

<p>Warn contacts that your account sent messages you did not authorize. Tell them not to click links or send money based on those messages. If the attacker impersonated you to request a payment, contact the affected person directly by phone or another channel.</p>

<p>Check sent mail and deleted items for messages you did not send. Note the recipients and any links so you can report them accurately. Do not forward suspicious links to friends; describe them instead.</p>

<h2>Check money and connected accounts</h2>

<p>Review bank, card, and payment-app activity for charges you do not recognize. If the email account was used to reset a banking password, call the bank using the number on your card or statement, not a number from an email. Change passwords on any account that used the compromised address for recovery.</p>

<p>If you store payment details in the email account, remove them until the account is fully secured. Check online shopping accounts for new addresses or payment methods.</p>

<h2>Report the compromise</h2>

<p>Use the provider's official security report form if one exists. Report phishing messages to the provider and, in the United States, forward them to the relevant reporting address for the FTC. If identity documents were exposed, consider a credit freeze and monitor your accounts.</p>

<h2>Prevent a repeat</h2>

<p>Keep two-factor authentication on, use a password manager, and never enter your email password after clicking a link in a message. Check your forwarding rules and recovery settings every few months. A recovery code stored offline is the difference between a stressful hour and a lost account.</p>

<div class="image-placeholder">Screenshot mockup of a two-factor authentication setup screen with an authenticator app QR code and recovery codes, with the codes blurred.</div>

<p>Finally, scan the device you used before the compromise. Malware can steal sessions and passwords even after you change them. If the account is a work account, tell your IT team immediately so they can check the organization for related activity.</p>
$content$,
    'email-help',
    'Screenshot mockup of a generic account security page with Change password, Two-step verification, and Recent security activity sections highlighted.',
    'Maya Chen',
    false,
    timestamptz '2026-10-13 09:00:00+00'
  ),
  (
    'Why Your Wi-Fi Router Keeps Disconnecting',
    'Separate a provider problem from a local Wi-Fi problem before replacing hardware.',
    'wifi-router-keeps-disconnecting',
    'Track down random Wi-Fi drops by checking the provider, router placement, channel congestion, firmware, DHCP leases, heat, and device load.',
    $content$
<p>A router that disconnects every few hours is frustrating because the fix depends on the cause. The internet provider may be dropping the line, the router may be overheating, or a neighbor's network may be interfering. Start by finding out whether the whole network drops at once or only one device.</p>

<h2>Is it the router or the provider?</h2>

<p>When the connection fails, check the router's indicator lights. If the internet light turns red or off, the router has lost its link to the provider. If the Wi-Fi light stays on and other devices remain connected, the problem is likely local to one device.</p>

<p>Keep a simple log for a few days: time, which devices lost connection, and what the router lights showed. A pattern such as “every evening around 8 PM” points to congestion or provider load; random drops at any time point to hardware or interference.</p>

<div class="image-placeholder">Screenshot mockup of a router's front panel with power, internet, and Wi-Fi lights, using generic labels and no real brand names.</div>

<h2>Move the router and restart it properly</h2>

<p>Place the router in an open, central area, away from metal cabinets, microwaves, cordless phone bases, and large mirrors. Do not bury it behind a TV or inside a closed cupboard. Heat is a common cause of random reboots, so make sure the vents are clear.</p>

<ol>
  <li>Unplug the router's power, not just the internet cable.</li>
  <li>Wait at least thirty seconds.</li>
  <li>Plug it back in and wait two minutes for the connection to stabilize.</li>
  <li>Test a wired connection if possible.</li>
</ol>

<p>If a wired connection is stable while Wi-Fi drops, focus on wireless settings. If both drop together, focus on the router, modem, or provider line.</p>

<h2>Change the Wi-Fi channel</h2>

<p>On 2.4 GHz, neighboring networks often crowd the same channels. Use the router's admin page or a Wi-Fi analyzer app to see which channels are busiest, then switch to a quieter one. Channels 1, 6, and 11 are the only non-overlapping options in the common 2.4 GHz band.</p>

<p>For 5 GHz, congestion is usually lower, but range is shorter. If your devices support it, connect them to the 5 GHz network when you are in the same room as the router. Avoid “band steering” features that aggressively move devices between bands if you see repeated drops during roaming.</p>

<div class="image-placeholder">Screenshot mockup of a generic router admin page showing the 2.4 GHz wireless channel selector and a list of nearby networks.</div>

<h2>Update the router firmware</h2>

<p>Log in to the router's admin page and check for a firmware update. Install it only from the manufacturer's official interface or website. Firmware fixes often address random reboots, DHCP bugs, and security flaws. Do not power off the router during the update.</p>

<p>If the router is provided by your internet company, the firmware may be controlled remotely. Ask support whether your model has a known issue and whether they can push an update.</p>

<h2>Check DHCP leases and device overload</h2>

<p>Every device on the network needs an IP address. A small router with a short DHCP lease pool can run out of addresses when guests and smart-home devices connect. In the router settings, increase the DHCP pool size or extend the lease time if the option is available.</p>

<p>Too many active devices can also overwhelm an older router. Disconnect devices you are not using, and move smart-home gadgets to a guest network if the router supports one. A guest network isolates them and reduces the load on the main network.</p>

<h2>Watch for heat and power problems</h2>

<p>Touch the router after it has been running for an hour. If it is hot enough to be uncomfortable, improve airflow or move it. Use the power adapter that came with the router; a mismatched adapter can cause instability. Plug the router directly into a wall outlet rather than a crowded power strip if you see random reboots.</p>

<h2>When to replace the router</h2>

<p>Replace the router if it is more than five or six years old, if it reboots under load, or if it cannot handle your internet speed. A new router will not fix a bad provider line, so confirm the modem and line are healthy first. If the provider supplies the router, ask for a replacement before buying your own.</p>

<p>If drops continue on a wired connection with a replacement router, contact the provider. Ask them to check the line signal and the modem logs during a drop. That evidence is more useful than “the internet keeps cutting out.”</p>
$content$,
    'internet-help',
    'Screenshot mockup of a router''s front panel with power, internet, and Wi-Fi lights, using generic labels and no real brand names.',
    'Jordan Lee',
    false,
    timestamptz '2026-10-09 09:00:00+00'
  );

insert into seed_blogs (
  title, subtitle, slug, description, content, category_slug,
  cover_image_note, author_name, is_featured, published_at
) values
  (
    'Why Your Internet Is Slower Than Your Plan',
    'Measure the right number before you blame the provider.',
    'internet-slower-than-plan',
    'Test your connection properly, separate Wi-Fi limits from line speed, and find the most common reasons a plan underperforms.',
    $content$
<p>Internet plans are advertised in megabits per second, but the number you see in a browser is affected by Wi-Fi, the device, the server you are testing, and how many people are using the connection. Before calling your provider, measure a wired connection and compare it with the plan you actually pay for.</p>

<h2>Test with a cable, not Wi-Fi</h2>

<p>Connect a laptop directly to the router with an Ethernet cable, disable Wi-Fi on the laptop, and run a speed test from a reputable service. Test at a quiet time and again during the evening. A wired test shows what the line can deliver; a Wi-Fi test adds variables that the provider cannot control.</p>

<div class="image-placeholder">Screenshot mockup of a speed test result showing download, upload, and ping values, with an Ethernet connection label and no real IP address.</div>

<p>If the wired result is close to your plan, the internet line is fine and the slowdown is local. If the wired result is far below the plan, continue with the provider checks below.</p>

<h2>Understand the units</h2>

<p>Internet speed is measured in megabits per second (Mbps). Download sizes are often shown in megabytes (MB), and one megabyte is eight megabits. A 100 Mbps connection can download a 1 GB file in roughly 80 seconds under ideal conditions, not in 10 seconds. Browser download speeds may also be limited by the server sending the file.</p>

<p>Upload speed is usually much lower than download speed on home plans. Video calls, cloud backups, and large attachments depend on upload, so a plan that feels fast for streaming can still struggle when you send files.</p>

<h2>Check the router and modem</h2>

<p>An older router may not support the speed you pay for. Check the router's WAN and LAN ports: a router with 100 Mbps ports cannot deliver a 500 Mbps plan over a wired connection, no matter what the label says. Also confirm that the Ethernet cable is at least Category 5e and undamaged.</p>

<p>Restart the modem and router once, then test again. If the modem is provided by the internet company and is several years old, ask whether it supports your current plan. A replacement modem is often free or low-cost when the old one is the bottleneck.</p>

<h2>Improve Wi-Fi before replacing it</h2>

<ul>
  <li>Move the router to a central, open location.</li>
  <li>Use the 5 GHz band for nearby devices that need speed.</li>
  <li>Change the 2.4 GHz channel to 1, 6, or 11.</li>
  <li>Disconnect old devices that are not in use.</li>
  <li>Update the router firmware.</li>
</ul>

<p>Wi-Fi is a shared medium. A microwave, a cordless phone, or a neighbor's network can reduce throughput even when the signal looks strong. Test in the same room as the router to see the best-case result, then test where you actually work.</p>

<div class="image-placeholder">Screenshot mockup of a Wi-Fi analyzer showing 2.4 GHz channel congestion, with channels 1, 6, and 11 marked as the non-overlapping choices.</div>

<h2>Look for background usage</h2>

<p>Cloud backups, game updates, security scans, and video streams can consume the connection while you are testing. Open Task Manager's <strong>Performance &gt; Ethernet</strong> or <strong>Wi-Fi</strong> tab and watch the throughput when you are not actively doing anything. If something is downloading in the background, pause it and test again.</p>

<p>On a shared network, one device running a backup can make every other device feel slow. Check the router's device list for unfamiliar devices and ask household members whether a large download is in progress.</p>

<h2>Check peak-hour congestion</h2>

<p>If speed is good at 10 AM and poor at 8 PM, the provider's neighborhood network may be congested. Document the times and the wired results for several days. Providers are more likely to investigate a pattern than a single test taken during a busy hour.</p>

<p>Some plans also have a data cap or a temporary slowdown after heavy usage. Read the plan details and your account usage page before assuming the line is faulty.</p>

<h2>What to tell your provider</h2>

<p>Call with evidence: the plan speed, the wired test results at different times, the modem model, and whether the slowdown affects every device. Ask them to check the signal levels and error counters on the line. If they send a technician, keep the wired test results available so the visit starts with facts.</p>

<p>Do not accept “that is normal” without a comparison to the plan. A wired result below roughly 80 percent of the advertised speed during off-peak hours is worth investigating, especially if it is consistent.</p>
$content$,
    'internet-help',
    'Screenshot mockup of a speed test result showing download, upload, and ping values, with an Ethernet connection label and no real IP address.',
    'Jordan Lee',
    false,
    timestamptz '2026-10-05 09:00:00+00'
  ),
  (
    'Use a Different DNS Server to Fix Browsing Problems',
    null,
    'change-dns-server-windows',
    'Learn when DNS is the cause of slow or failing websites, how to change it safely in Windows 11, and when to leave it alone.',
    $content$
<p>DNS is the internet's address book. When you type a website name, your device asks a DNS server for the numeric address behind it. If that server is slow, unreachable, or returning the wrong answer, pages can load slowly or fail even though the connection itself is fine.</p>

<p>Changing DNS is not a universal speed fix. It helps when the current resolver is unreliable, but it will not increase your plan's bandwidth or fix a weak Wi-Fi signal. Test the symptoms first, then change one setting at a time.</p>

<h2>Signs that DNS may be the problem</h2>

<ul>
  <li>Websites fail by name, but an IP address or another device still works.</li>
  <li>Pages pause for several seconds before loading.</li>
  <li>Some sites fail while others work normally.</li>
  <li>The problem started after a router or VPN change.</li>
  <li>A browser reports “server DNS address could not be found.”</li>
</ul>

<p>Open Command Prompt and run <code>nslookup example.com</code>. If it times out or returns an unexpected server, DNS is a reasonable suspect. If it returns an address quickly but the page still fails, the problem may be the browser, a firewall, or the site itself.</p>

<div class="image-placeholder">Screenshot mockup of Command Prompt running nslookup, showing a successful response from a DNS server with the IP address blurred.</div>

<h2>Change DNS in Windows 11</h2>

<ol>
  <li>Open <strong>Settings &gt; Network &amp; internet</strong>.</li>
  <li>Select <strong>Wi-Fi</strong> or <strong>Ethernet</strong>, then open the active connection's hardware properties.</li>
  <li>Find <strong>DNS server assignment</strong> and select <strong>Edit</strong>.</li>
  <li>Change the setting from <strong>Automatic (DHCP)</strong> to <strong>Manual</strong>.</li>
  <li>Turn on <strong>IPv4</strong> and enter a preferred and alternate DNS server.</li>
  <li>Save, then disconnect and reconnect the network.</li>
</ol>

<p>Common public resolvers include Cloudflare at <code>1.1.1.1</code> and <code>1.0.0.1</code>, and Google at <code>8.8.8.8</code> and <code>8.8.4.4</code>. Use a provider you trust and understand its privacy policy. Do not enter random addresses from a forum post.</p>

<p>If your organization requires a specific DNS server for internal sites or filtering, do not override it. A manual setting can break access to company resources or bypass a security control.</p>

<h2>Flush the DNS cache</h2>

<p>Windows caches recent lookups. After changing the server, open an administrator Command Prompt and run <code>ipconfig /flushdns</code>. Then test the same sites again. If the old answer was cached, the change may not take effect until the cache is cleared or the device reconnects.</p>

<p>You can also restart the browser. Some browsers keep their own DNS cache and may continue using an old result until they are fully closed.</p>

<h2>Change DNS at the router instead</h2>

<p>If you want every device on the network to use the new resolver, set it in the router's internet or WAN settings. This is convenient for phones, TVs, and smart-home devices that do not expose DNS settings. After saving, restart the router and reconnect a device to test.</p>

<p>Router-level DNS can be overridden by a device's manual setting or by a VPN. If one device behaves differently, check that device's configuration before changing the router again.</p>

<div class="image-placeholder">Screenshot mockup of a generic router admin page showing WAN DNS fields with primary and secondary server inputs, using placeholder addresses.</div>

<h2>Consider encrypted DNS</h2>

<p>Windows 11 supports DNS over HTTPS for some resolvers. In the DNS settings, choose a known resolver and enable encrypted DNS if the option appears. This protects DNS queries from being read on the local network, but it does not hide the websites you visit from your provider or employer.</p>

<p>Encrypted DNS can also interfere with captive portals at hotels and airports. If a login page will not appear, temporarily switch back to automatic DNS, complete the sign-in, and then decide whether to re-enable encryption.</p>

<h2>When to undo the change</h2>

<p>If pages become slower, some sites fail, or a work application stops connecting, return DNS to <strong>Automatic (DHCP)</strong> and flush the cache. A public resolver is not automatically better than the one your provider supplies. The right choice depends on your location, network, and privacy needs.</p>

<p>Changing DNS is a diagnostic step as much as a fix. If a new resolver solves the problem, keep it and note the change. If nothing changes, restore the original setting and look at the connection, browser, or router instead.</p>
$content$,
    'internet-help',
    'Screenshot mockup of Windows 11 DNS server assignment set to Manual with IPv4 preferred and alternate fields visible.',
    'Jordan Lee',
    false,
    timestamptz '2026-10-01 09:00:00+00'
  ),
  (
    'How to Spot a Phishing Email',
    'Slow down, check the address, and verify through a second channel.',
    'spot-phishing-email',
    'Recognize phishing by checking sender addresses, link destinations, urgency, and attachments—then verify the request outside email.',
    $content$
<p>Phishing works because it looks ordinary. A message appears to come from your bank, a delivery company, your boss, or a service you actually use. The goal is to make you click before you think. You do not need to become a security expert to reduce the risk; you need a short, repeatable check.</p>

<h2>Pause before you click</h2>

<p>Treat every unexpected message that asks for a password, payment, or personal information as suspicious until you verify it. That includes messages that appear to come from someone you know. Email addresses and display names can be spoofed, and a compromised account can send convincing messages to everyone in its contact list.</p>

<div class="image-placeholder">Screenshot mockup of a suspicious email with the sender address, reply-to address, and a hovered link destination highlighted.</div>

<h2>Check the actual sender address</h2>

<p>On desktop, expand the sender details. The display name might say “Microsoft Support,” but the address could be a random domain. Look at the part after the @ symbol. A bank that uses <code>bank.com</code> will not send account alerts from <code>bank-secure-login.example</code>.</p>

<p>Check the reply-to address too. A message can appear to come from one address and send replies to another. If the reply-to domain does not match the sender, treat the message as suspicious.</p>

<h2>Hover over links before clicking</h2>

<p>Hover over a link without clicking. Most mail apps show the destination at the bottom of the window. Compare the real domain with the one in the message text. Attackers use lookalike domains, extra words, and unusual endings such as <code>.example</code> instead of <code>.com</code>.</p>

<p>On a phone, press and hold a link to preview the address. If the preview is unclear, do not open it. Instead, type the organization's known address into a browser or use its official app.</p>

<h2>Look for pressure and unusual requests</h2>

<p>Phishing messages often create urgency: “Your account will be closed today,” “Confirm this payment immediately,” or “This is your final warning.” They may ask you to bypass a normal process, keep the request secret, or pay with gift cards. Real organizations rarely demand secrecy or instant action by email.</p>

<p>Be especially careful with invoices, payroll changes, and requests to reset a password. Verify the request using a phone number or chat channel you already have, not a number supplied in the email.</p>

<div class="image-placeholder">Screenshot mockup of a phishing-style email with an urgent subject line, a mismatched sender domain, and a suspicious attachment icon, using fictional details.</div>

<h2>Treat attachments with caution</h2>

<p>An attachment can carry malware even if the message looks harmless. Be wary of unexpected ZIP files, HTML attachments, and Office documents that ask you to enable macros. A PDF can contain a link to a malicious site even though the PDF itself is not executable.</p>

<p>Do not open an attachment you did not expect, even if the sender is familiar. Contact the sender through another channel and ask whether they sent it. If the message is from a company, open the company's website directly and look for the document there.</p>

<h2>Verify through a second channel</h2>

<p>If your bank asks you to confirm a transaction, call the number on your card or log in through the bank's app. If your boss asks for a gift card, speak to them in person or by a known phone number. If a delivery company claims a fee is due, track the package through the retailer or the carrier's official app.</p>

<p>This step defeats most phishing because the attacker controls only the email, not the separate channel. It takes an extra minute and is worth it for anything involving money, credentials, or identity documents.</p>

<h2>What to do if you clicked</h2>

<p>If you entered a password, change it immediately from a clean device and enable two-factor authentication. If you downloaded an attachment, disconnect the device from the network and run a full security scan. Tell your IT team if this is a work account, and report the message to your provider.</p>

<p>Do not be embarrassed. Phishing is designed to work under pressure, and fast reporting limits the damage. Keep the original message if your organization's security team asks for it, but do not forward it to friends.</p>

<p>Finally, report the message using your mail app's phishing button. Reporting improves filters for everyone and gives your security team a chance to block the campaign before someone else clicks.</p>
$content$,
    'security-help',
    'Screenshot mockup of a suspicious email with the sender address, reply-to address, and a hovered link destination highlighted.',
    'Maya Chen',
    false,
    timestamptz '2026-09-27 09:00:00+00'
  ),
  (
    'Create Strong Passwords You Can Actually Remember',
    null,
    'create-strong-passwords',
    'Use long passphrases, unique logins, and a password manager instead of relying on clever substitutions that are easy to guess.',
    $content$
<p>Strong passwords do not have to be random strings you cannot type. Length matters more than complexity, and a memorable passphrase can be both stronger and easier to use than a short password with symbols. The bigger problem is reuse: one breached password can unlock many accounts.</p>

<h2>Start with length</h2>

<p>A password made of four or five unrelated words is easier to remember than a jumble of characters and harder to guess than a short complex string. For example, a passphrase of five random words is long enough to resist most guessing attacks while still being typeable. Do not use a famous quote, a song lyric, or a sequence that appears in a public word list.</p>

<p>For important accounts, add a password manager-generated random password. You do not need to memorize those because the manager fills them in. Reserve memorable passphrases for the few passwords you must type by hand, such as your device login and your password manager's master password.</p>

<div class="image-placeholder">Screenshot mockup comparing a short complex password with a longer four-word passphrase, using fictional examples and a strength meter.</div>

<h2>Use a unique password for every account</h2>

<p>Reuse is the reason a breach at one company can lead to a break-in at another. Attackers take email and password pairs from old breaches and try them on banking, shopping, and social sites. If you use the same password everywhere, one leak becomes many problems.</p>

<p>If you cannot replace every password today, start with the accounts that matter most: email, banking, work, and any account that can reset the others. Your email account is especially important because it receives password-reset links for everything else.</p>

<h2>Let a password manager do the remembering</h2>

<ol>
  <li>Choose a reputable password manager and install it on your computer and phone.</li>
  <li>Create a strong master passphrase you have never used elsewhere.</li>
  <li>Enable two-factor authentication on the manager itself.</li>
  <li>Import existing passwords, then change the reused ones over time.</li>
  <li>Store the recovery code offline, not in the same account.</li>
</ol>

<p>A manager removes the tradeoff between strong and memorable. It also helps you notice reused passwords and generates new ones when you sign up. Do not store your master password in a note on the same device.</p>

<div class="image-placeholder">Screenshot mockup of a password manager vault with reused-password warnings, generated password options, and a two-factor authentication badge.</div>

<h2>Turn on two-factor authentication</h2>

<p>Two-factor authentication is the single best protection after a strong password. Prefer an authenticator app or a hardware security key over SMS when the service supports it. SMS codes can be intercepted or stolen through a SIM swap, though SMS is still better than no second factor.</p>

<p>Save recovery codes when you enable two-factor authentication. If you lose your phone, those codes are the difference between a quick recovery and a locked account. Print them or store them in an offline password vault, not in a screenshot on the same phone.</p>

<h2>Avoid predictable patterns</h2>

<ul>
  <li>Do not use your name, birthday, pet, or favorite team.</li>
  <li>Do not append a year to an old password and call it new.</li>
  <li>Do not use “P@ssw0rd” style substitutions; attackers try them first.</li>
  <li>Do not use the same passphrase with a different number at the end.</li>
  <li>Do not share passwords by email or chat.</li>
</ul>

<p>If a service limits password length or characters, use the longest random password it allows and let the manager store it. A limit is a reason to be more careful, not to reuse a password from another site.</p>

<h2>Check for breaches and update carefully</h2>

<p>Use a reputable breach-check service to see whether your email appears in known leaks. If it does, change the password on that site and anywhere you reused it. A breach check is not a guarantee; it only covers incidents that have been published.</p>

<p>When you change a password, sign out other sessions if the service offers that option. This is especially important after a suspected compromise. Then check recovery settings and remove phone numbers or email addresses you no longer control.</p>

<p>Finally, make password updates part of your routine rather than a panic response. Review your important accounts every few months, replace reused passwords, and keep your manager and devices updated. A small amount of maintenance prevents most account takeovers.</p>
$content$,
    'security-help',
    'Screenshot mockup comparing a short complex password with a longer four-word passphrase, using fictional examples and a strength meter.',
    'Maya Chen',
    false,
    timestamptz '2026-09-23 09:00:00+00'
  ),
  (
    'Secure Your Home Wi-Fi Network',
    'The router settings worth changing today, and the ones you can leave alone.',
    'secure-home-wifi-network',
    'Change the router admin password, use WPA3 or WPA2, update firmware, disable WPS, and separate guest and smart-home devices.',
    $content$
<p>A home Wi-Fi network is only as secure as its router settings. Most routers ship with a default admin password, outdated firmware, and features that make connecting easy but also make snooping easier. You do not need a networking degree to improve the basics; a short visit to the admin page covers most of the risk.</p>

<h2>Change the router admin password</h2>

<p>The admin page controls every setting on the router. If someone on your network—or someone who finds the router exposed to the internet—can log in with the default password, they can change your Wi-Fi password, redirect traffic, or disable security.</p>

<ol>
  <li>Find the router's admin address, often printed on the label.</li>
  <li>Sign in with the current credentials.</li>
  <li>Change the admin password to a unique passphrase you do not use elsewhere.</li>
  <li>Save the new password in your password manager.</li>
</ol>

<div class="image-placeholder">Screenshot mockup of a generic router admin login page and the administration password change screen, with fictional labels.</div>

<p>If the router still uses “admin” for both the username and password, change it before doing anything else. Do not reuse the Wi-Fi password as the admin password.</p>

<h2>Use WPA3 or WPA2</h2>

<p>In the wireless security settings, choose <strong>WPA3-Personal</strong> if all your devices support it. Otherwise choose <strong>WPA2-Personal</strong> with AES encryption. Avoid WEP, WPA-TKIP, and “open” networks. These older options are either broken or easy to crack.</p>

<p>WPA3 is stronger, but older smart-home devices may refuse to connect. If that happens, keep WPA2 for the main network and put the older devices on a guest network with a separate password. Do not downgrade the main network for one outdated device.</p>

<h2>Update the router firmware</h2>

<p>Firmware updates fix security holes and stability problems. Check the router admin page for an update option and install it from the manufacturer's official interface. If the router is supplied by your internet company, ask whether updates are managed remotely.</p>

<p>Do not install firmware from a random download site. A malicious firmware image can take over the router completely. After updating, note the version and check again every few months.</p>

<div class="image-placeholder">Screenshot mockup of a router firmware update page showing the current version, a Check for updates button, and a warning not to power off during installation.</div>

<h2>Turn off WPS and remote administration</h2>

<p>WPS lets devices join with a PIN or a push button. The PIN method has known weaknesses, so turn WPS off unless you actively need it. Remote administration lets you manage the router from outside your home; disable it unless you have a specific reason and understand the risk.</p>

<p>Also disable UPnP if you do not need it. UPnP can make it easier for apps to open ports without asking, and it has been abused by malware. If a game or app stops working, you can re-enable it or set up a specific port forward instead.</p>

<h2>Separate guests and smart devices</h2>

<p>Use the guest network for visitors and smart-home gadgets. A guest network keeps those devices away from your computers and network storage. Give it a different password and, if the router supports it, disable guest access to local devices.</p>

<p>Smart plugs, cameras, and TVs often receive infrequent security updates. Isolating them limits what an attacker can reach if one device is compromised. Do not put a work laptop on the same guest network as an unknown visitor's phone.</p>

<h2>Check the device list</h2>

<p>Open the router's connected-devices page and review the list. If you see a device you do not recognize, change the Wi-Fi password, reconnect your own devices, and investigate. A renamed device is not proof of an intruder; a neighbor may have connected with an old password, or a device may show a generic name.</p>

<p>Some routers let you reserve addresses or block unknown devices. Use these features carefully; blocking by MAC address is easy to bypass and can lock out your own devices after a reset.</p>

<h2>Keep the network healthy</h2>

<p>Write down the router model, admin address, and where you stored the password. Keep the router in a ventilated place and reboot it occasionally if it becomes unstable. If the router no longer receives firmware updates from the manufacturer, plan to replace it rather than assuming it is still secure.</p>

<p>Security is a set of small, maintained choices. A unique admin password, current firmware, WPA2 or WPA3, and a separate guest network cover the most important gaps for a typical home.</p>
$content$,
    'security-help',
    'Screenshot mockup of a generic router wireless security page with WPA3-Personal selected, WPS disabled, and a separate guest network toggle visible.',
    'Alex Morgan',
    false,
    timestamptz '2026-09-19 09:00:00+00'
  );

insert into public.blogs (
  title, subtitle, slug, description, content, category_id,
  cover_image_url, cover_image_alt, cover_image_note, author_name,
  status, is_featured, published_at
)
select
  s.title,
  s.subtitle,
  s.slug,
  s.description,
  s.content,
  c.id,
  null,
  null,
  s.cover_image_note,
  s.author_name,
  'published',
  s.is_featured,
  s.published_at
from seed_blogs s
join public.categories c on c.slug = s.category_slug
on conflict (slug) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  description = excluded.description,
  content = excluded.content,
  category_id = excluded.category_id,
  cover_image_note = excluded.cover_image_note,
  author_name = excluded.author_name,
  status = excluded.status,
  is_featured = excluded.is_featured,
  published_at = excluded.published_at,
  updated_at = now();

drop table seed_blogs;

commit;
