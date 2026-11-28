# Hướng Dẫn Thực Hành Merge Conflict Situation

> Người thực hành: **Thư Lê** và **Thư Anh**
> Branch thực hành: `merge-conflict-situation`

## Mục tiêu

Hiểu được cách 2 người cùng làm việc trên 1 branch chung, cách conflict xảy ra, và cách giải quyết conflict trong Git.

## Bước 0: Chuẩn bị (cả 2 người)

```bash
# Cập nhật repo về mới nhất
git fetch origin

# Tạo branch tập trung từ main
git checkout -b merge-conflict-situation origin/main

# Đưa branch lên GitHub
git push -u origin merge-conflict-situation
```

> Từ đây trở đi, mọi thay đổi đều làm trên branch `merge-conflict-situation`, KHÔNG làm trên `feature/page-thu-le` hay `feature/page-thu-anh` nữa.

## Bước 1: Thư Lê commit trước

```bash
git pull origin merge-conflict-situation
```

Mở file `README.md`, thêm 1 dòng bất kỳ ở cuối, ví dụ:

```
## Contributed by Thu Le - 28/11/2026
```

```bash
git add -A
git commit -m "Thu Le: update README"
git push origin merge-conflict-situation
```

## Bước 2: Thư Anh commit sau

```bash
git pull origin merge-conflict-situation
```

Mở file `README.md`, thêm 1 dòng khác, ví dụ:

```
## Contributed by Thu Anh - 28/11/2026
```

```bash
git add -A
git commit -m "Thu Anh: update README"
git push origin merge-conflict-situation
```

> Đến đây chưa có conflict, vì 2 người thêm ở 2 vị trí khác nhau trong file.

## Bước 3: Tạo conflict thực sự

Yêu cầu: **cùng sửa 1 dòng trong cùng 1 file**.

1. **Thư Lê**: mở `README.md`, sửa dòng title đầu tiên (dòng 1) thành:

   ```
   # TDTT Mini Project - Thu Le Version
   ```

   ```bash
   git add -A
   git commit -m "Thu Le: change title"
   git push origin merge-conflict-situation
   ```

2. **Thư Anh**: **KHÔNG pull**. Mở `README.md` (vẫn còn bản cũ), sửa **cùng dòng 1** đó thành:

   ```
   # TDTT Mini Project - Thu Anh Version
   ```

   ```bash
   git add -A
   git commit -m "Thu Anh: change title"
   git push origin merge-conflict-situation
   ```

   → **Push sẽ bị rejected** với lỗi `non-fast-forward`. Đây là dấu hiệu có conflict.

## Bước 4: Giải quyết conflict (Thư Anh làm)

```bash
git pull origin merge-conflict-situation
```

Console sẽ hiện:

```
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

Mở file `README.md`, sẽ thấy khối conflict:

```
<<<<<<< HEAD
# TDTT Mini Project - Thu Anh Version
=======
# TDTT Mini Project - Thu Le Version
>>>>>>> abc1234 (Thu Le: change title)
```

**Ý nghĩa:**
- `<<<<<<< HEAD` → bản của người đang merge (Thư Anh)
- `=======` → ranh giới giữa 2 bản
- `>>>>>>> ...` → bản từ branch bên kia (Thư Lê)

**Cách sửa:**

1. Xoá 3 dòng đánh dấu `<<<<<<< HEAD`, `=======`, `>>>>>>> ...`
2. Giữ lại nội dung đúng — thường là kết hợp cả 2, ví dụ:

   ```
   # TDTT Mini Project - Thu Le & Thu Anh
   ```

3. Lưu file.

```bash
git add README.md
git commit -m "Resolve merge conflict in README"
git push origin merge-conflict-situation
```

### Cách khác: dùng VS Code

Khi có conflict, VS Code sẽ hiển thị từng khối conflict với 3 nút:

| Nút | Ý nghĩa |
|-----|---------|
| **Accept Current Change** | Giữ bản của mình (Thư Anh) |
| **Accept Incoming Change** | Giữ bản của người kia (Thư Lê) |
| **Accept Both Changes** | Giữ cả 2 bản |

Chọn nút phù hợp → lưu file → `git add` → `git commit` → `git push`.

## Bước 5: Kiểm tra kết quả

```bash
git log --oneline --graph -10
```

Sẽ thấy 1 commit merge nối 2 nhánh lại. Mở `README.md` xác nhận nội dung cuối cùng đúng.

## Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách xử lý |
|-----|-------------|-----------|
| `non-fast-forward` | Branch local tụt hậu remote | `git pull` trước khi push |
| `CONFLICT (content)` | 2 người sửa cùng dòng | Sửa conflict markers rồi commit |
| Lỡ merge sai | Merge xong mới phát hiện | `git merge --abort` (trước khi commit) hoặc `git reset --hard HEAD~1` (sau khi commit) |

## Quy tắc vàng

1. **Luôn `git pull` trước khi bắt đầu làm việc**
2. **Không bao giờ `git push -f` lên branch chung**
3. **Conflict chỉ xảy ra khi 2 người sửa cùng khu vực của cùng file**
4. **Nếu không conflict → `git pull` tự merge, không cần làm gì thêm**
5. **Sau khi giải quyết conflict, thông báo cho người kia biết để pull lại**
