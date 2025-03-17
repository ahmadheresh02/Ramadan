document.addEventListener('DOMContentLoaded', () => {
    const donationForm = document.getElementById('donationForm');

    donationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // 🔹 تحقق إذا كان المستخدم مسجل دخول
        const storedUser = localStorage.getItem('user');
if (!storedUser) {
    alert('You must log in first before donating.');
    return;
}

// 🔹 Get data from the form
const donationAmount = document.getElementById('donationAmount').value;
const donationFrequency = document.querySelector('input[name="donationFrequency"]:checked').id;
const donationInitiative = document.getElementById('donationInitiative').value;

// 🔹 Store data in localStorage
const donations = JSON.parse(localStorage.getItem('donations')) || [];
const newDonation = {
    user: JSON.parse(storedUser).email,
    amount: donationAmount,
    frequency: donationFrequency,
    initiative: donationInitiative,
    date: new Date().toLocaleString()
};

donations.push(newDonation);
localStorage.setItem('donations', JSON.stringify(donations));

// 🔹 Success message
alert('Thank you for your donation! 🎉');
donationForm.reset();

    });
});
document.addEventListener('DOMContentLoaded', () => {
    displayDonations(); // استدعاء الدالة عند تحميل الصفحة

    function displayDonations() {
        const donationsTableBody = document.getElementById('donationsTableBody');
        donationsTableBody.innerHTML = ''; // تفريغ الجدول قبل إضافة البيانات

        const donations = JSON.parse(localStorage.getItem('donations')) || [];

        if (donations.length === 0) {
            donationsTableBody.innerHTML = `<tr><td colspan="5" class="text-center">لا يوجد تبرعات حتى الآن 😔</td></tr>`;
            return;
        }

        donations.forEach(donation => {
            const row = `
    <tr>
        <td>${donation.user}</td>
        <td>$${donation.amount}</td>
        <td>${donation.frequency === 'oneTime' ? 'One-time' : 'Monthly'}</td>
        <td>${getInitiativeName(donation.initiative)}</td>
        <td>${donation.date}</td>
    </tr>
`;
donationsTableBody.innerHTML += row;

        });
    }

    function getInitiativeName(value) {
        const initiatives = {
            general: '💰 General Fund',
            food: '🍲 Food Distribution',
            education: '📚 Education Support',
            community: '🏡 Community Support',
            healthcare: '🏥 Healthcare Services'
        };
        return initiatives[value] || 'Unknown';
    }
    
});
