# Báo cáo dự án Git & GitHub

## 1. Tổng quan dự án

Nhóm 1 xây dựng một website tĩnh giới thiệu nhóm và sáu thành viên trong khuôn khổ môn **Tư duy tính toán**. Mỗi thành viên phụ trách một trang HTML riêng và cộng tác thông qua branch, commit, Pull Request, review và merge trên GitHub.

- **Repository:** [Zoto1/TDTT-miniprj](https://github.com/Zoto1/TDTT-miniprj)
- **Công nghệ:** HTML5, CSS3, Git và GitHub

## 2. Đóng góp của thành viên

| Thành viên | Nhiệm vụ | Đóng góp hiện tại | Minh chứng |
| --- | --- | --- | --- |
| Sand (Harvey Huynh) | Xây dựng trang cá nhân | Đã xây dựng trang portfolio Sand và thêm ảnh đại diện trên feature branch | [Branch](https://github.com/Zoto1/TDTT-miniprj/tree/feature/page-sand), [Commit 42737b7](https://github.com/Zoto1/TDTT-miniprj/commit/42737b77c13c3f1df3751e0d742aa83000910f7a) |
| Huy Khánh (`@DrakyNeUwU`) | Xây dựng trang chủ `index.html`, điều hướng chung và trang cá nhân `members/khanh.html` | Hoàn thiện trang chủ Nhóm 1 (kèm dark/light theme, ảnh nhóm, thẻ 6 thành viên, phần đồ án chung) và trang portfolio cá nhân tích hợp CV cùng hiệu ứng chuyển cảnh mượt | [PR #5](https://github.com/Zoto1/TDTT-miniprj/pull/5), [PR #6](https://github.com/Zoto1/TDTT-miniprj/pull/6), [Commit bd8907b](https://github.com/Zoto1/TDTT-miniprj/commit/bd8907b9cd05af73a67c489e40bba2397d93c699), [Commit 88e987e](https://github.com/Zoto1/TDTT-miniprj/commit/88e987e1bc2a4c2fe7caeda9b2d15b95693f46fb) |

> Các thành viên khác bổ sung hàng đóng góp của mình vào bảng trên.

## 3. Thực hiện và minh chứng

### 3.1. Trang portfolio cá nhân của Sand

**Công việc đã thực hiện**

- Tạo trang cá nhân tại `members/sand.html` bằng HTML và CSS thuần.
- Thiết kế giao diện responsive dựa trên phong cách academic portfolio.
- Bổ sung phần giới thiệu, lĩnh vực quan tâm, coursework và thông tin liên hệ.
- Thêm ảnh đại diện tại `assets/sand-avatar.jpg`.
- Thêm liên kết đến trang chủ nhóm, FIT-HCMUS, LinkedIn, GitHub và Discord.
- Sử dụng font Playfair Display và Lora cùng bảng màu tối olive.

**Kết quả**

Trang Sand hiển thị nội dung portfolio cá nhân, hoạt động trên màn hình máy tính và thiết bị di động, đồng thời có liên kết quay về trang chủ nhóm.

**Minh chứng**

- Feature branch: [`feature/page-sand`](https://github.com/Zoto1/TDTT-miniprj/tree/feature/page-sand)
- Commit: [`42737b7 - add sand portfolio page`](https://github.com/Zoto1/TDTT-miniprj/commit/42737b77c13c3f1df3751e0d742aa83000910f7a)
- File HTML: [`members/sand.html`](https://github.com/Zoto1/TDTT-miniprj/blob/feature/page-sand/members/sand.html)
- Ảnh đại diện: [`assets/sand-avatar.jpg`](https://github.com/Zoto1/TDTT-miniprj/blob/feature/page-sand/assets/sand-avatar.jpg)

### 3.2. Trang chủ nhóm và trang portfolio cá nhân của Huy Khánh

**Công việc đã thực hiện**

- Xây dựng trang chủ nhóm tại `index.html`, stylesheet dùng chung `assets/style.css` và bộ chuyển đổi sáng/tối `assets/theme.js` (lưu trạng thái bằng `localStorage`).
- Thiết kế phần mở đầu với ảnh họp nhóm thật, lưới 6 thẻ thành viên liên kết trực tiếp đến 6 trang trong `members/`, phần câu chuyện nhóm (3 bước phát triển) và phần giới thiệu đồ án chung *Trợ lý lập kế hoạch du lịch ảo (Travel Planning Virtual Assistant)*.
- Xây dựng trang cá nhân tại `members/khanh.html` cùng `assets/khanh.css`, `assets/khanh.js` thuần HTML/CSS/Vanilla JS: bố cục sidebar trái cố định (chuyển thành topbar/drawer gọn trên điện thoại), tích hợp CV PDF tại `assets/docs/CV_NguyenHuyKhanh.pdf`, giới thiệu dự án nhóm, kỹ năng theo 3 nhóm, thông tin liên hệ và thanh điều hướng giữa 6 thành viên.
- Bổ sung hiệu ứng chuyển cảnh Fixed Stage kết hợp `clip-path` mượt theo cuộn chuột trên desktop (`>= 960px`), tự động trả về luồng cuộn bình thường trên thiết bị di động và chế độ giảm chuyển động (`prefers-reduced-motion`).
- Thực hiện tách nhánh riêng cho từng phần việc (`feature/homepage-nav-review`, `feature/page-khanh-review`, `docs/report-khanh-contribution`) và gửi Pull Request vào `main`.

**Kết quả**

- Trang chủ `index.html` đã được merge vào `main` qua PR #5, hiển thị đầy đủ 6 thành viên, hỗ trợ giao diện sáng/tối và hiển thị gọn trên cả desktop (`1440px`) lẫn mobile (`390px`).
- Trang cá nhân `members/khanh.html` (PR #6) hoạt động ổn định, không lỗi console, liên kết chéo đầy đủ về trang chủ và các thành viên khác trong nhóm.

**Minh chứng**

- Feature branches: [`feature/homepage-nav-review`](https://github.com/Zoto1/TDTT-miniprj/tree/feature/homepage-nav-review), [`feature/page-khanh-review`](https://github.com/Zoto1/TDTT-miniprj/tree/feature/page-khanh-review)
- Pull Requests: [PR #5 (Merged — Trang chủ & CSS dùng chung)](https://github.com/Zoto1/TDTT-miniprj/pull/5), [PR #6 (Open — Trang cá nhân Huy Khánh)](https://github.com/Zoto1/TDTT-miniprj/pull/6)
- Commits tiêu biểu:
  - [`eb4fd61 - Use real group Discord call screenshot as homepage hero cover`](https://github.com/Zoto1/TDTT-miniprj/commit/eb4fd61)
  - [`bbc037a - Refine homepage hero clarity, readable member cards, team story timeline, and project showcase`](https://github.com/Zoto1/TDTT-miniprj/commit/bbc037a)
  - [`bd8907b - Keep mobile homepage header nav on single row with anchored theme toggle`](https://github.com/Zoto1/TDTT-miniprj/commit/bd8907b9cd05af73a67c489e40bba2397d93c699)
  - [`b2aa106 - Remove Hero top-right CTA and add Fixed Stage scrubbed clip-path scroll transitions`](https://github.com/Zoto1/TDTT-miniprj/commit/b2aa106)
  - [`88e987e - Focus course version of khanh.html on Group 1 project and concise About section`](https://github.com/Zoto1/TDTT-miniprj/commit/88e987e1bc2a4c2fe7caeda9b2d15b95693f46fb)
- File chính: [`index.html`](https://github.com/Zoto1/TDTT-miniprj/blob/main/index.html), [`assets/style.css`](https://github.com/Zoto1/TDTT-miniprj/blob/main/assets/style.css), [`members/khanh.html`](https://github.com/Zoto1/TDTT-miniprj/blob/feature/page-khanh-review/members/khanh.html)
