const portfolioData = [
  { id: 1, img: 'assets/images/image1.jpeg', category: 'web', title: 'FinTech Dashboard' },
  { id: 2, img: 'assets/images/image2.jpeg', category: 'mobile', title: 'Health App' },
  { id: 3, img: 'assets/images/iamge3.jpeg', category: 'blockchain', title: 'NFT Marketplace' },
  { id: 4, img: 'assets/images/image4.jpeg', category: 'uiux', title: 'Banking UI' },
  { id: 5, img: 'assets/images/image5.jpeg', category: 'software', title: 'ERP System' },
  { id: 6, img: 'assets/images/image6.jpeg', category: 'web', title: 'E-commerce' },
  { id: 7, img: 'assets/images/image7.jpeg', category: 'mobile', title: 'Social App' },
  { id: 8, img: 'assets/images/image8.jpeg', category: 'blockchain', title: 'DeFi Platform' },
  { id: 9, img: 'assets/images/image9.jpeg', category: 'uiux', title: 'SaaS Design' },
  { id: 10, img: 'assets/images/image10.jpeg', category: 'software', title: 'CRM Tool' },
  { id: 11, img: 'assets/images/image11.jpeg', category: 'web', title: 'Portfolio Site' },
  { id: 12, img: 'assets/images/image12.jpeg', category: 'mobile', title: 'Delivery App' },
  { id: 13, img: 'assets/images/image13.jpeg', category: 'blockchain', title: 'Crypto Wallet' },
  { id: 14, img: 'assets/images/image14.jpeg', category: 'uiux', title: 'Dashboard UI' },
  { id: 15, img: 'assets/images/image15.jpeg', category: 'software', title: 'HRMS' },
  { id: 16, img: 'assets/images/image16.jpeg', category: 'web', title: 'Agency Site' },
  { id: 17, img: 'assets/images/image17.jpeg', category: 'mobile', title: 'Fitness Tracker' },
  { id: 18, img: 'assets/images/image18.jpeg', category: 'blockchain', title: 'Smart Contract' },
  { id: 19, img: 'assets/images/image19.jpeg', category: 'uiux', title: 'Mobile Banking' },
  { id: 20, img: 'assets/images/image20.jpeg', category: 'software', title: 'Analytics Platform' }
];

function renderPortfolio(filter = 'all') {
  const grid = document.getElementById('portfolioDynamicGrid') || document.getElementById('portfolioGrid');
  if (!grid) return;
  const filtered = filter === 'all' ? portfolioData : portfolioData.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(item => `
    <div class="portfolio-item" data-category="${item.category}">
      <img src="${item.img}" alt="${item.title}" loading="lazy">
      <div class="portfolio-overlay"><h3>${item.title}</h3><span>${item.category.toUpperCase()}</span></div>
    </div>
  `).join('');
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPortfolio(btn.dataset.filter);
  });
});
renderPortfolio();