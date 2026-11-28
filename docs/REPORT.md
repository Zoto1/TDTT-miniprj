# Báo cáo dự án Git & GitHub

## 1. Tổng quan dự án

Nhóm 1 xây dựng một website tĩnh giới thiệu nhóm và sáu thành viên trong khuôn khổ môn **Tư duy tính toán**. Mỗi thành viên phụ trách một trang HTML riêng và cộng tác thông qua branch, commit, Pull Request, review và merge trên GitHub.

- **Repository:** [Zoto1/TDTT-miniprj](https://github.com/Zoto1/TDTT-miniprj)
- **Công nghệ:** HTML5, CSS3, Git và GitHub

## 2. Đóng góp của thành viên

| Thành viên | Nhiệm vụ | Đóng góp hiện tại | Minh chứng |
| --- | --- | --- | --- |
| Sand (Harvey Huynh) | Xây dựng trang cá nhân | Đã xây dựng trang portfolio Sand và thêm ảnh đại diện trên feature branch | [Branch](https://github.com/Zoto1/TDTT-miniprj/tree/feature/page-sand), [Commit 42737b7](https://github.com/Zoto1/TDTT-miniprj/commit/42737b77c13c3f1df3751e0d742aa83000910f7a) |
| Thư Anh (Thư Nguyễn trên trang chủ) | Xây dựng trang cá nhân và thực hành xung đột Git | Xây dựng hồ sơ cá nhân, thêm ảnh tương tác cho phần sở thích và đưa thay đổi tiêu đề trang chủ lên nhánh thực hành | `17e1086`, `99e84ff`, `e75a878`, `547191d` |
| Thư Lê | Xây dựng trang cá nhân và xử lý xung đột Git | Xây dựng trang giới thiệu có hình ảnh, thêm phần liên hệ và hiệu ứng khi cuộn, sau đó hợp nhất hai phiên bản tiêu đề trên nhánh thực hành | `cb1c21c`, `455bbb4`, `fd8ffd7`, `9c1e099` |

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

### 3.2. Trang cá nhân của Thư Anh

Thư Anh xây dựng `members/thu-anh.html` trên nhánh `feature/page-thu-anh`. Trang gồm phần giới thiệu bản thân, sở thích cá nhân, mục tiêu học tập và liên hệ. Phần sở thích có ảnh xem trước tương tác và được tinh chỉnh để khung ảnh phù hợp với hình dáng từng ảnh. CSS điều chỉnh bố cục theo chiều rộng màn hình. Trang chủ nhóm đặt liên kết đến hồ sơ này dưới tên Thư Nguyễn. Các phiên bản có nội dung của hồ sơ được lưu trên nhánh cá nhân.

Minh chứng gồm các commit `17e1086` (tạo hồ sơ), `99e84ff` (hoàn thiện hồ sơ và thêm ảnh tương tác) và `e75a878` (chỉnh khung ảnh xem trước).

### 3.3. Trang cá nhân của Thư Lê

Thư Lê xây dựng [trang cá nhân](../members/thu-le.html) gồm phần mở đầu, mục “10 things you need to know about me” và thông tin liên hệ. Trang dùng [CSS riêng](../assets/thu-le.css), ảnh và biểu tượng trong `TLimages/` cùng phông chữ lưu trong `fonts/`. Phần mở đầu có hiệu ứng xuất hiện. Các thẻ giới thiệu hiện dần khi người xem cuộn đến, thông qua JavaScript và `IntersectionObserver`.

Minh chứng gồm các commit `cb1c21c` (bổ sung mục giới thiệu và tài nguyên hình ảnh), `c3e9311` (bổ sung tài nguyên phông chữ và định dạng phần liên hệ), `455bbb4` (hoàn thiện hiệu ứng khi cuộn) và `fd8ffd7` (đưa HTML và CSS vào thư mục tương ứng).

### 3.4. Thực hành xử lý xung đột Git của Thư Anh và Thư Lê

Hai thành viên thực hành trên nhánh `merge-conflict-situation`. Commit `5639944` của Thư Lê cập nhật README ở giai đoạn chuẩn bị. Tình huống xung đột xảy ra khi cả hai sửa cùng dòng tiêu đề chính trong `index.html`.

1. Hai thành viên lấy thông tin mới từ remote bằng `git fetch origin` và kiểm tra mốc `origin/main` bằng `git rev-parse origin/main`. Commit `5ba0248` ghi lại lần hợp nhất nhánh thực hành trước khi sửa tiêu đề. [Ảnh của Thư Anh](images/commits/thu-anh0.png), [ảnh của Thư Lê](images/commits/thu-le0.png), [commit hợp nhất](images/git_history/commit_thuanh.png).
2. Thư Anh đổi tiêu đề thành “Chúng mình là Nhóm 1 — phiên bản Thư Anh”, tạo commit `547191d` và đẩy thành công lên nhánh chung. Thư Lê sửa cùng dòng thành phiên bản mang tên mình trong commit cục bộ `09a7cd9`. Khi Thư Lê đẩy lên, Git từ chối với thông báo `fetch first` vì nhánh trên remote đã có commit của Thư Anh. [Ảnh Thư Anh đẩy commit](images/commits/thu-anh1.png), [ảnh Git từ chối lượt đẩy của Thư Lê](images/commits/thu-le2.png).
3. Khi Thư Lê chạy `git pull`, Git báo hai nhánh đã phân kỳ và yêu cầu chọn cách tích hợp. Trong lần hợp nhất, VS Code hiển thị bản của Thư Lê ở mục **Current Change** và bản của Thư Anh ở mục **Incoming Change**. Thư Lê chọn **Accept Both Changes** để giữ cả hai dòng tiêu đề. [Ảnh thông báo phân kỳ](images/commits/thu-le3a.png), [ảnh xung đột trong VS Code](images/commits/thu-le3b.png), [ảnh sau khi giữ cả hai thay đổi](images/commits/thu-le3c.png).
4. Commit hợp nhất `9c1e099` nối hai commit `09a7cd9` và `547191d` và đã có trên nhánh thực hành của remote. Git ghi lại cả hai dòng tiêu đề trong `index.html`. [Ảnh lịch sử Git](images/commits/thu-le4.png), [ảnh commit của Thư Lê](images/git_history/commit_thule.png), [ảnh diff sau khi hợp nhất](images/git_history/commit.png).

Lần thực hành cho thấy Git từ chối lượt đẩy khi remote có commit mà nhánh cục bộ chưa tích hợp. Xung đột nội dung xuất hiện ở bước hợp nhất vì cả hai thay đổi chồng lên cùng một dòng. Kết quả minh họa cách giữ cả hai thay đổi, đồng thời để lại hai thẻ `<h1>` dùng chung `id="site-title"`. Nếu dùng kết quả này cho trang chủ chính thức, có thể gộp nội dung vào một tiêu đề để bảo đảm ID duy nhất.
