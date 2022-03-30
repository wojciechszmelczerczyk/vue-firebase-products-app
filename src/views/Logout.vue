<script setup>
import { useRouter } from "vue-router";

localStorage.clear();

const router = useRouter();

router.push("/login");
</script>
